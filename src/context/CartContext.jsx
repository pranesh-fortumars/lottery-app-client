import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user, updateBalance } = useAuth();

  // --- Cart State ---
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('diamond_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // --- Purchased Tickets ---
  const [purchasedTickets, setPurchasedTickets] = useState(() => {
    const savedTickets = localStorage.getItem('diamond_purchased_tickets');
    return savedTickets ? JSON.parse(savedTickets) : [];
  });

  // --- Declared Results ---
  const [declaredResults, setDeclaredResults] = useState(() => {
    const savedResults = localStorage.getItem('diamond_results');
    return savedResults ? JSON.parse(savedResults) : [];
  });

  // --- Notifications ---
  const [notifications, setNotifications] = useState(() => {
    const savedNotifs = localStorage.getItem('diamond_notifications');
    return savedNotifs ? JSON.parse(savedNotifs) : [
      { id: 1, title: 'Welcome to Diamond!', message: 'Start your lottery journey today.', time: 'Just now', read: false, type: 'info' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('diamond_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('diamond_purchased_tickets', JSON.stringify(purchasedTickets));
  }, [purchasedTickets]);

  useEffect(() => {
    localStorage.setItem('diamond_results', JSON.stringify(declaredResults));
  }, [declaredResults]);

  useEffect(() => {
    localStorage.setItem('diamond_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addToCart = (entry) => {
    setCart((prev) => [...prev, { ...entry, id: Date.now() }]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const confirmPurchase = () => {
    if (cart.length === 0) return;
    const timestamp = new Date().toLocaleString();
    const newPurchases = cart.map(item => ({
      ...item,
      purchaseId: `TX${Math.floor(1000 + Math.random() * 9000)}`,
      purchaseTime: timestamp,
      status: 'Active',
      prize: '-'
    }));
    setPurchasedTickets((prev) => [...newPurchases, ...prev]);
    clearCart();
    addNotification({
       title: 'Tickets Confirmed!',
       message: `Your purchase of ${cart.length} tickets is successful.`,
       type: 'success'
    });
  };

  const addNotification = (notif) => {
    const newNotif = {
      ...notif,
      id: Date.now(),
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addResult = (resultData) => {
    const newResultEntry = {
      ...resultData,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      status: 'Active'
    };
    
    setDeclaredResults((prev) => [newResultEntry, ...prev]);

    // Send a global notification for the draw result
    addNotification({
      title: `${resultData.brand} Result Declared!`,
      message: `The results for the ${resultData.draw} draw are out. Winning Number: ${resultData.number}`,
      type: 'result'
    });

    // --- Winner Processing ---
    let userWon = false;
    let totalPrize = 0;

    const updatedTickets = purchasedTickets.map(ticket => {
      if (!ticket.title.includes(resultData.draw)) return ticket;

      const winningPosition = resultData.winPositions.find(pos => pos.number === ticket.num);
      
      if (winningPosition) {
        const prizeAmount = parseFloat(winningPosition.amount) * ticket.qty;
        
        if (ticket.status !== 'Won' && user?.role === 'user') {
          userWon = true;
          totalPrize += prizeAmount;
          updateBalance(prizeAmount);
        }

        return {
          ...ticket,
          status: 'Won',
          prize: `₹ ${prizeAmount.toLocaleString()}`
        };
      }
      
      return ticket;
    });

    if (userWon) {
      addNotification({
        title: '🎉 You Won!',
        message: `Congratulations! Your ticket matched a winning number. ₹ ${totalPrize.toLocaleString()} added to your wallet.`,
        type: 'win'
      });
    }

    setPurchasedTickets(updatedTickets);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      confirmPurchase,
      cartTotal,
      purchasedTickets,
      declaredResults,
      addResult,
      notifications,
      markAllRead,
      addNotification
    }}>
      {children}
    </CartContext.Provider>
  );
};

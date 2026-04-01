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
    // resultData structure: { draw, brand, digits: {X,A,B,C}, prizes: {...} }
    const { digits, prizes } = resultData;
    const fullNum = `${digits.X}${digits.A}${digits.B}${digits.C}`;
    
    const newResultEntry = {
      ...resultData,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      status: 'Active',
      number: fullNum // For display
    };
    
    setDeclaredResults((prev) => [newResultEntry, ...prev]);

    // Global notification
    addNotification({
      title: `${resultData.brand} Result Declared!`,
      message: `The results for ${resultData.draw} are out. Winning Number: ${fullNum}`,
      type: 'result'
    });

    // --- Complex Winner Processing based on 1D/2D/3D/4D ---
    let userWon = false;
    let totalWinAmount = 0;

    const updatedTickets = purchasedTickets.map(ticket => {
      // Check draw time and market (if applicable)
      if (!ticket.title.includes(resultData.draw)) return ticket;
      if (ticket.status === 'Won') return ticket; // Skip already processed

      let isWinner = false;
      let wonPrize = 0;

      // Extract specific combinations from the declared 4 digits
      const combinations = {
        '1D_A': digits.A,
        '1D_B': digits.B,
        '1D_C': digits.C,
        '2D_AB': `${digits.A}${digits.B}`,
        '2D_BC': `${digits.B}${digits.C}`,
        '2D_AC': `${digits.A}${digits.C}`,
        '3D_ABC': `${digits.A}${digits.B}${digits.C}`,
        '4D_XABC': `${digits.X}${digits.A}${digits.B}${digits.C}`
      };

      // Ticket Type Logic
      const tNum = ticket.num.toString();
      const tType = ticket.type; // Assuming ticket has 'type' ('1D', '2D', etc)
      const tPos = ticket.pos;   // Assuming ticket has 'pos' ('A', 'AB', etc)

      if (tType === '1D') {
         if (tNum === combinations[`1D_${tPos}`]) {
            isWinner = true;
            wonPrize = parseFloat(prizes['1D'][tPos]);
         }
      } else if (tType === '2D (DOUBLE)') {
         if (tNum === combinations[`2D_${tPos}`]) {
            isWinner = true;
            wonPrize = parseFloat(prizes['2D'][tPos]);
         }
      } else if (tType === '3D') {
         if (tNum === combinations['3D_ABC']) {
            isWinner = true;
            wonPrize = parseFloat(prizes['3D'].ABC);
         }
      } else if (tType === '4D') {
         if (tNum === combinations['4D_XABC']) {
            isWinner = true;
            wonPrize = parseFloat(prizes['4D'].XABC);
         }
      }

      if (isWinner) {
        const totalAward = wonPrize * ticket.qty;
        userWon = true;
        totalWinAmount += totalAward;
        updateBalance(totalAward);

        return {
          ...ticket,
          status: 'Won',
          prize: `₹ ${totalAward.toLocaleString()}`
        };
      }
      
      return ticket;
    });

    if (userWon) {
      addNotification({
        title: '🎉 JACKPOT WINNER!',
        message: `Congratulations! Your ticket matched the combination. ₹ ${totalWinAmount.toLocaleString()} added to your wallet.`,
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

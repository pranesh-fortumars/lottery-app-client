import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

  // --- Helper to load from localStorage ---
  const load = (key, defaultVal) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultVal;
  };

  // --- States ---
  const [cart, setCart] = useState(() => load('diamond_cart', []));
  const [purchasedTickets, setPurchasedTickets] = useState(() => load('diamond_purchased_tickets', []));
  const [declaredResults, setDeclaredResults] = useState(() => load('diamond_results', []));
  const [notifications, setNotifications] = useState(() => load('diamond_notifications', [
    { id: 1, title: 'Welcome to Diamond!', message: 'Start your lottery journey today.', time: 'Just now', read: false, type: 'info' }
  ]));

  // --- Persistence Effects ---
  useEffect(() => { localStorage.setItem('diamond_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('diamond_purchased_tickets', JSON.stringify(purchasedTickets)); }, [purchasedTickets]);
  useEffect(() => { localStorage.setItem('diamond_results', JSON.stringify(declaredResults)); }, [declaredResults]);
  useEffect(() => { localStorage.setItem('diamond_notifications', JSON.stringify(notifications)); }, [notifications]);

  // --- ⚡ CROSS-TAB DYNAMIC SYNC (Crucial for Multi-Port Experience) ⚡ ---
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'diamond_results') {
         const newResults = JSON.parse(e.newValue);
         setDeclaredResults(newResults);
      }
      if (e.key === 'diamond_purchased_tickets') {
         setPurchasedTickets(JSON.parse(e.newValue));
      }
      if (e.key === 'diamond_notifications') {
         setNotifications(JSON.parse(e.newValue));
      }
      if (e.key === 'diamond_balance' && user) {
         // Balance sync across tabs is handled by AuthContext if needed, 
         // but let's ensure we refresh tickets if a result was declared.
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user]);

  const addToCart = (entry) => setCart((prev) => [...prev, { ...entry, id: Date.now() }]);
  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

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

  const addNotification = useCallback((notif) => {
    const newNotif = { ...notif, id: Date.now(), time: 'Just now', read: false };
    setNotifications(prev => [newNotif, ...prev]);
  }, []);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const addResult = (resultData) => {
    const { digits, prizes } = resultData;
    const fullNum = `${digits.X}${digits.A}${digits.B}${digits.C}`;
    
    // 1. Save Result
    const newResultEntry = { ...resultData, id: Date.now(), date: new Date().toLocaleDateString(), status: 'Active', number: fullNum };
    setDeclaredResults((prev) => [newResultEntry, ...prev]);

    // 2. Notify Global
    addNotification({
      title: `${resultData.brand} Result Out!`,
      message: `The results for ${resultData.draw} are out. Winning: ${fullNum}`,
      type: 'result'
    });

    // 3. Process Winners (Dynamic calculation)
    let userWon = false;
    let totalWinAmount = 0;

    const updatedTickets = purchasedTickets.map(ticket => {
      if (!ticket.title.includes(resultData.draw)) return ticket;
      if (ticket.status === 'Won') return ticket; 

      let isWinner = false;
      let wonPrize = 0;

      const combinations = {
        '1D_A': digits.A, '1D_B': digits.B, '1D_C': digits.C,
        '2D_AB': `${digits.A}${digits.B}`, '2D_BC': `${digits.B}${digits.C}`, '2D_AC': `${digits.A}${digits.C}`,
        '3D_ABC': `${digits.A}${digits.B}${digits.C}`,
        '4D_XABC': `${digits.X}${digits.A}${digits.B}${digits.C}`
      };

      const tNum = ticket.num.toString();
      const tType = ticket.type; 
      const tPos = ticket.pos;   

      if (tType === '1D') {
         if (tNum === combinations[`1D_${tPos}`]) { isWinner = true; wonPrize = parseFloat(prizes['1D'][tPos]); }
      } else if (tType === '2D (DOUBLE)') {
         if (tNum === combinations[`2D_${tPos}`]) { isWinner = true; wonPrize = parseFloat(prizes['2D'][tPos]); }
      } else if (tType === '3D') {
         if (tNum === combinations['3D_ABC']) { isWinner = true; wonPrize = parseFloat(prizes['3D'].ABC); }
      } else if (tType === '4D') {
         if (tNum === combinations['4D_XABC']) { isWinner = true; wonPrize = parseFloat(prizes['4D'].XABC); }
      }

      if (isWinner) {
        const totalAward = wonPrize * ticket.qty;
        userWon = true;
        totalWinAmount += totalAward;
        updateBalance(totalAward);
        return { ...ticket, status: 'Won', prize: `₹ ${totalAward.toLocaleString()}` };
      }
      return { ...ticket, status: 'Closed' }; // Mark as finished if not won
    });

    if (userWon) {
      addNotification({
        title: '🎉 JACKPOT WINNER!',
        message: `Congratulations! Your ticket matched. ₹ ${totalWinAmount.toLocaleString()} added to your wallet.`,
        type: 'win'
      });
    }

    setPurchasedTickets(updatedTickets);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, clearCart, confirmPurchase,
      cartTotal, purchasedTickets, declaredResults, addResult,
      notifications, markAllRead, addNotification
    }}>
      {children}
    </CartContext.Provider>
  );
};

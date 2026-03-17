import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home as HomeIcon, Trash2, ShoppingCart } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const SelectionPage = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const isKerala = gameId === '2'; // Kerala is 4-digit
  const digitCount = isKerala ? 4 : 3;
  
  const [selectedBoard, setSelectedBoard] = useState('ALL');
  const [number, setNumber] = useState(Array(digitCount).fill(''));
  const [quantity, setQuantity] = useState(1);
  const [entries, setEntries] = useState([]);

  const handleNumberChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newNumber = [...number];
      newNumber[index] = value;
      setNumber(newNumber);
      
      // Auto focus next input
      if (value && index < digitCount - 1) {
        document.getElementById(`digit-${index + 1}`).focus();
      }
    }
  };

  const addEntry = () => {
    if (number.some(n => n === '')) return;
    const entry = {
      id: Date.now(),
      num: number.join(''),
      board: selectedBoard,
      qty: quantity,
      price: selectedBoard === 'ALL' ? (isKerala ? 40 : 30) : 10
    };
    setEntries([...entries, entry]);
    setNumber(Array(digitCount).fill(''));
    // Focus first input again
    document.getElementById('digit-0').focus();
  };

  const removeEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const generateRandom = () => {
    const randomNum = Array(digitCount).fill(0).map(() => Math.floor(Math.random() * 10).toString());
    setNumber(randomNum);
  };

  return (
    <div className="app-content">
      {/* Detail Header */}
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--white)', padding: '10px 15px', borderBottom: '1px solid #ddd' }}>
        <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', color: 'red', marginRight: '10px' }}>
          <HomeIcon size={24} />
        </button>
        <span style={{ fontWeight: 'bold', color: 'red' }}>Lottery Selection</span>
        <div style={{ marginLeft: 'auto', fontWeight: 'bold', color: 'red' }}>👤 Guest()</div>
      </div>

      <div style={{ padding: '15px' }}>
        {/* Selection Card */}
        <div style={{ 
          backgroundColor: 'white', 
          border: '2px solid var(--border-red)', 
          borderRadius: '10px', 
          padding: '15px',
          marginBottom: '20px'
        }}>
          <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', marginBottom: '15px', textAlign: 'center' }}>CHOOSE YOUR NUMBERS</h3>
          
          {/* Board Selection */}
          <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
            {['A', 'B', 'C', ...(isKerala ? ['D'] : []), 'ALL'].map(board => (
              <button 
                key={board}
                onClick={() => setSelectedBoard(board)}
                style={{ 
                  flex: 1, 
                  padding: '10px 0', 
                  borderRadius: '5px', 
                  border: '1px solid var(--border-red)',
                  backgroundColor: selectedBoard === board ? 'var(--border-red)' : 'white',
                  color: selectedBoard === board ? 'white' : 'black',
                  fontWeight: 'bold',
                  fontSize: '0.8rem'
                }}
              >
                {board}
              </button>
            ))}
          </div>

          {/* Number Inputs */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
            {number.map((digit, i) => (
              <input 
                key={i}
                id={`digit-${i}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleNumberChange(i, e.target.value)}
                style={{ 
                  width: '45px', 
                  height: '45px', 
                  borderRadius: '8px', 
                  border: '1px solid #000',
                  textAlign: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  outline: 'none'
                }}
              />
            ))}
          </div>

          {/* Quantity and Random */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               <span style={{ fontWeight: 'bold' }}>Qty:</span>
               <input 
                 type="number" 
                 min="1" 
                 value={quantity} 
                 onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                 style={{ width: '50px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} 
               />
            </div>
            <button onClick={generateRandom} className="btn-random">Random</button>
          </div>

          <button onClick={addEntry} className="btn-add">ADD ENTRY</button>
        </div>

        {/* Entries Table */}
        {entries.length > 0 && (
          <div style={{ backgroundColor: 'white', border: '2px solid var(--border-red)', borderRadius: '10px', padding: '10px' }}>
            <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.2rem', marginBottom: '10px', borderBottom: '1px solid #ddd' }}>YOUR ENTRIES</h4>
            {entries.map((entry) => (
              <div key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px dotted #ccc' }}>
                 <div>
                   <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{entry.num}</span>
                   <span style={{ fontSize: '0.8rem', marginLeft: '10px', color: '#666' }}>Board: {entry.board} | Qty: {entry.qty}</span>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontWeight: 'bold', color: 'red' }}>₹{entry.price * entry.qty}</span>
                    <Trash2 size={18} color="red" onClick={() => removeEntry(entry.id)} style={{ cursor: 'pointer' }} />
                 </div>
              </div>
            ))}
            <button 
              onClick={() => navigate('/cart')}
              style={{ 
                width: '100%', 
                marginTop: '15px', 
                padding: '12px', 
                backgroundColor: 'black', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px',
                fontFamily: 'Bebas Neue',
                fontSize: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              PROCEED TO CART <ShoppingCart size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectionPage;

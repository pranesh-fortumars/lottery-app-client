import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Minus, Plus, ShoppingCart, Info, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JackpotPage = () => {
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState('11.30 AM');
  
  const timeSlots = [
    { time: '10.30 AM', status: 'closed' },
    { time: '11.30 AM', status: 'active' },
    { time: '12.30 PM', status: 'active' },
    { time: '01.30 PM', status: 'active' },
    { time: '03.30 PM', status: 'active' },
    { time: '05.30 PM', status: 'active' },
    { time: '06.30 PM', status: 'active' },
    { time: '07.30 PM', status: 'active' },
  ];

  // Selection states
  const [singleDigits, setSingleDigits] = useState({ A: '', B: '', C: '', qtyA: 1, qtyB: 1, qtyC: 1 });
  const [doubleDigits, setDoubleDigits] = useState({ AB: ['', ''], BC: ['', ''], AC: ['', ''], qtyAB: 1, qtyBC: 1, qtyAC: 1 });
  
  const handleQtyChange = (type, board, delta) => {
    if (type === 'single') {
      const key = `qty${board}`;
      setSingleDigits(prev => ({ ...prev, [key]: Math.max(1, prev[key] + delta) }));
    } else if (type === 'double') {
      const key = `qty${board}`;
      setDoubleDigits(prev => ({ ...prev, [key]: Math.max(1, prev[key] + delta) }));
    }
  };

  const handleRandom = (type) => {
    if (type === 'single') {
      setSingleDigits(prev => ({
        ...prev,
        A: Math.floor(Math.random() * 10).toString(),
        B: Math.floor(Math.random() * 10).toString(),
        C: Math.floor(Math.random() * 10).toString(),
      }));
    }
    // Add other random logic as needed
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Local Header for Jackpot (Matches Provided HTML) */}
      <header className="bg-primary-red" style={{ color: 'white', padding: '12px 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Home size={24} onClick={() => navigate('/home')} style={{ cursor: 'pointer' }} />
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', letterSpacing: '1px', margin: 0 }}>DIAMOND JACKPOT LOTTERY</h1>
        </div>
        <User size={24} />
      </header>

      {/* Announcement Bar */}
      <div style={{ backgroundColor: '#fce4ec', color: 'var(--primary-pink)', padding: '4px 10px', fontSize: '12px', overflow: 'hidden' }}>
        <marquee>Lot purchase time you can buy lot upto 10:45 AM and Result will be out at 11:00 AM. Good luck!</marquee>
      </div>

      {/* Rules & Results Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '15px', gap: '15px' }}>
        <button className="btn-jackpot-action">
          <span>🔨</span> Rules
        </button>
        <button className="btn-jackpot-action">
          <span>📋</span> Results
        </button>
      </div>

      {/* Time Slots Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', padding: '0 15px 15px' }}>
        {timeSlots.map((slot) => (
          <div 
            key={slot.time}
            onClick={() => slot.status === 'active' && setSelectedSlot(slot.time)}
            style={{ 
              border: `2px solid ${slot.status === 'closed' ? '#999' : (selectedSlot === slot.time ? 'var(--primary-pink)' : '#eee')}`,
              backgroundColor: slot.status === 'closed' ? '#999' : (selectedSlot === slot.time ? 'var(--primary-pink)' : 'white'),
              color: slot.status === 'closed' ? 'white' : (selectedSlot === slot.time ? 'white' : 'var(--primary-pink)'),
              borderRadius: '8px',
              padding: '5px',
              textAlign: 'center',
              cursor: slot.status === 'active' ? 'pointer' : 'default',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ fontSize: '10px', fontWeight: 'bold' }}>{slot.time}</div>
            <div style={{ fontSize: '8px' }}>{slot.status === 'closed' ? 'Jackpot Lot closed' : 'Jackpot Lot'}</div>
          </div>
        ))}
      </div>

      {/* Game Selection Sections */}
      <div style={{ padding: '0 15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Single Digit Section */}
        <div className="jackpot-card">
          <div className="jackpot-card-header">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
               <div className="pot-icon">💰</div>
               <div>
                 <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Single Digit <span style={{ color: 'red' }}>Win ₹ 100</span></div>
                 <div style={{ color: 'red', fontWeight: 'bold', fontSize: '12px' }}>₹ 11.00</div>
               </div>
            </div>
            <button onClick={() => handleRandom('single')} className="jackpot-btn-random">Random</button>
          </div>

          {['A', 'B', 'C'].map(board => (
            <div key={board} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
              <div className="jackpot-board-circle">{board}</div>
              <input 
                type="text" 
                maxLength="1" 
                className="jackpot-input" 
                value={singleDigits[board]}
                onChange={(e) => setSingleDigits(prev => ({ ...prev, [board]: e.target.value.replace(/\D/g, '') }))}
              />
              <div className="jackpot-qty-control">
                <button onClick={() => handleQtyChange('single', board, -1)}><Minus size={14} /></button>
                <span>{singleDigits[`qty${board}`]}</span>
                <button onClick={() => handleQtyChange('single', board, 1)}><Plus size={14} /></button>
              </div>
              <button className="jackpot-btn-add">ADD</button>
            </div>
          ))}
        </div>

        {/* Double Digits Section */}
        <div className="jackpot-card">
          <div className="jackpot-card-header">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
               <div className="pot-icon">💰</div>
               <div>
                 <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Double Digits <span style={{ color: 'red' }}>Win ₹ 1000</span></div>
                 <div style={{ color: 'red', fontWeight: 'bold', fontSize: '12px' }}>₹ 11.00</div>
               </div>
            </div>
            <button className="jackpot-btn-random">Random</button>
          </div>

          {['AB', 'BC', 'AC'].map(board => (
            <div key={board} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
              <div style={{ display: 'flex', gap: '5px' }}>
                <div className="jackpot-board-circle">{board[0]}</div>
                <div className="jackpot-board-circle">{board[1]}</div>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <input type="text" maxLength="1" className="jackpot-input-small" />
                <input type="text" maxLength="1" className="jackpot-input-small" />
              </div>
              <div className="jackpot-qty-control">
                <button onClick={() => handleQtyChange('double', board, -1)}><Minus size={14} /></button>
                <span>{doubleDigits[`qty${board}`]}</span>
                <button onClick={() => handleQtyChange('double', board, 1)}><Plus size={14} /></button>
              </div>
              <button className="jackpot-btn-add">ADD</button>
            </div>
          ))}
        </div>

        {/* Three Digits Sections */}
        {[10000, 15000, 30000].map((win, idx) => (
          <div key={idx} className="jackpot-card">
            <div className="jackpot-card-header">
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                 <div className="pot-icon">💰</div>
                 <div>
                   <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Three Digits <span style={{ color: 'red' }}>Win ₹ {win.toLocaleString()}</span></div>
                   <div style={{ color: 'red', fontWeight: 'bold', fontSize: '12px' }}>₹ {idx === 1 ? '28.00' : (idx === 2 ? '55.00' : '0.00')}</div>
                 </div>
              </div>
              <button className="jackpot-btn-random">Random</button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {['A', 'B', 'C'].map(b => (
                   <div key={b} className="jackpot-board-circle">{b}</div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <input type="text" maxLength="1" className="jackpot-input-small" />
                <input type="text" maxLength="1" className="jackpot-input-small" />
                <input type="text" maxLength="1" className="jackpot-input-small" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
              <div className="jackpot-qty-control" style={{ width: '100px' }}>
                <button><Minus size={14} /></button>
                <span>1</span>
                <button><Plus size={14} /></button>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="jackpot-btn-box">BOX</button>
                <button className="jackpot-btn-add">ADD</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pay Now Button */}
      <div style={{ position: 'fixed', bottom: '15px', left: '15px', right: '15px', maxWidth: '450px', margin: '0 auto', zIndex: 100 }}>
        <button 
          onClick={() => navigate('/cart')}
          style={{ 
            width: '100%', 
            backgroundColor: 'var(--primary-pink)', 
            color: 'white', 
            padding: '15px', 
            borderRadius: '10px', 
            border: 'none', 
            fontFamily: 'Bebas Neue', 
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 4px 15px rgba(255, 32, 86, 0.4)'
          }}
        >
          <ShoppingCart size={24} /> PAY NOW
        </button>
      </div>
    </div>
  );
};

export default JackpotPage;

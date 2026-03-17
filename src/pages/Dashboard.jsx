import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const games = [
    { id: 1, name: 'DEAR', time: '02:39:19', type: '3-Digit', color: '#001a4d' },
    { id: 2, name: 'KERALA', time: '04:39:19', type: '4-Digit', color: '#00264d' },
    { id: 3, name: 'DEAR', time: '07:39:19', type: '3-Digit', color: '#001a4d' },
    { id: 4, name: 'DEAR', time: '09:39:19', type: '3-Digit', color: '#001a4d' },
  ];

  return (
    <div className="app-content">
      {/* Banner Area */}
      <div style={{ padding: '10px' }}>
        <img 
          src="https://images.unsplash.com/photo-1601314167099-232775b3d6fd?w=600&h=300&fit=crop" 
          alt="Banner" 
          style={{ width: '100%', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }} 
        />
      </div>

      {/* Digits Game Section */}
      <h2 className="section-title">
        <span style={{ fontSize: '1.2rem' }}>💎</span> 3 & 4 Digits Game
      </h2>

      <div className="lottery-grid">
        {games.map((game) => (
          <Link 
            key={game.id} 
            to={`/select/${game.id}`} 
            style={{ textDecoration: 'none' }}
          >
            <motion.div 
              whileTap={{ scale: 0.95 }}
              style={{ 
                background: `linear-gradient(135deg, ${game.color}, #000d1a)`,
                borderRadius: '12px',
                padding: '15px',
                border: '1px solid #ffd700',
                position: 'relative',
                height: '140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ color: '#ffd700', fontWeight: 'bold', fontSize: '0.9rem' }}>
                Next Lottery Booking Time
              </div>
              
              <div style={{ display: 'flex', gap: '5px' }}>
                {game.time.split(':').map((unit, i) => (
                  <div key={i} style={{ 
                    backgroundColor: 'white', 
                    color: 'black', 
                    padding: '4px 6px', 
                    borderRadius: '4px', 
                    fontWeight: '800',
                    fontSize: '1rem'
                  }}>
                    {unit}
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'right', color: '#ffd700', fontWeight: '900', fontSize: '1.1rem' }}>
                {game.name}
              </div>

              {/* Decorative Sparkle */}
              <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#ffd700' }}>
                ✨
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Jackpot Section */}
      <h2 className="section-title">
        <span style={{ fontSize: '1.2rem' }}>💎</span> Jackpot
      </h2>
      <div style={{ padding: '0 15px 20px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #004d00, #001a00)', 
          borderRadius: '12px', 
          padding: '20px', 
          textAlign: 'center',
          border: '2px solid #00ff00',
          color: 'white'
        }}>
          <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem' }}>WIN BIG JACKPOT!</h3>
          <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Daily slots available for maximum winnings.</p>
          <button style={{ marginTop: '10px', backgroundColor: '#00ff00', color: 'black', border: 'none', padding: '8px 20px', borderRadius: '20px', fontWeight: '700' }}>
            PLAY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

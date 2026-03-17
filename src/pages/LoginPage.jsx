import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Lock, Phone, ShoppingCart } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Login Header */}
      <header style={{ height: '50px', background: 'var(--primary-pink)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 15px' }}>
        <Home size={24} style={{ cursor: 'pointer' }} onClick={() => navigate('/home')} />
        <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', letterSpacing: '1px' }}>DIAMOND LOGIN</h1>
        <User size={24} />
      </header>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '30px 20px', width: '100%', maxWidth: '400px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          {/* Mobile Input Group */}
          <div style={{ display: 'flex', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#eee', padding: '12px 15px', borderRight: '1px solid #ddd', fontSize: '0.9rem', fontWeight: 'bold' }}>
              +91
            </div>
            <input 
              type="tel" 
              placeholder="Enter your mobile number" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{ flex: 1, border: 'none', padding: '12px', outline: 'none', fontSize: '1rem', fontFamily: 'Arvo' }}
            />
          </div>

          {/* Password Input Group */}
          <div style={{ display: 'flex', marginBottom: '25px', border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#eee', padding: '10px 15px', borderRight: '1px solid #ddd', color: '#333' }}>
              <Lock size={20} />
            </div>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ flex: 1, border: 'none', padding: '12px', outline: 'none', fontSize: '1rem', fontFamily: 'Arvo' }}
            />
          </div>

          <button onClick={handleLogin} style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: '#FF0000', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            fontFamily: 'Bebas Neue', 
            fontSize: '1.25rem', 
            marginBottom: '15px',
            cursor: 'pointer'
          }}>
            CONFIRM LOGIN
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ flex: 1, padding: '10px', backgroundColor: '#FF0000', color: 'white', border: 'none', borderRadius: '5px', fontFamily: 'Bebas Neue', fontSize: '1rem', cursor: 'pointer' }}>
               SIGNUP
            </button>
            <button style={{ flex: 1, padding: '10px', backgroundColor: '#FF0000', color: 'white', border: 'none', borderRadius: '5px', fontFamily: 'Bebas Neue', fontSize: '1rem', cursor: 'pointer' }}>
               RESET PASSWORD
            </button>
          </div>
        </div>
      </div>

      {/* Login Footer */}
      <footer style={{ background: 'var(--primary-pink)', color: 'white', padding: '20px 0', textAlign: 'center' }}>
        <p style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '0.9rem' }}>INDIA'S LARGEST PRIZES AGENCY</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px' }}>
          <Home size={24} />
          <User size={24} />
          <Lock size={24} />
          <ShoppingCart size={24} />
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import SelectionPage from './pages/SelectionPage';
import JackpotPage from './pages/JackpotPage';
import SignupPage from './pages/SignupPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import RulesPage from './pages/RulesPage';
import ResultsPage from './pages/ResultsPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';

import PageWrapper from './components/PageWrapper';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          <Route path="/home" element={
            <PageWrapper title="Diamond Agency">
              <Dashboard />
            </PageWrapper>
          } />
          
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/select/:gameId" element={<SelectionPage />} />
          <Route path="/jackpot" element={<JackpotPage />} />
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;

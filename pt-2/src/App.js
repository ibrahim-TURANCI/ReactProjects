import React, { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SessionManagement } from '../src/Services/AuthService';


const App = () => {
  // Önceki oturum bilgilerini localStorage'dan al
  const savedUser = localStorage.getItem('loggedInUser');
  const initialUser = savedUser ? JSON.parse(savedUser) : null;

  const [LoginUsers] = useState([
    { id: 1, name: 'Admin', email: 'a', password: '1', isAdmin: true },
    { id: 2, name: 'User', email: 'u', password: '1', isAdmin: false },
    // Diğer kullanıcılar
  ]);

  const [loggedInUser, setLoggedInUser] = useState(initialUser);

  // Oturum bilgilerini localStorage'e kaydet
  useEffect(() => {
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    SessionManagement();
  }, [loggedInUser]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage users={LoginUsers} setLoggedInUser={setLoggedInUser} />} />
        <Route path="/home" element={<Home loggedInUser={loggedInUser} />} />
        <Route path="/" element={<LoginPage users={LoginUsers} setLoggedInUser={setLoggedInUser} />} />  {/* Başlangıç sayfası olarak LoginPage */}
      </Routes>
    </Router>
  );
};

export default App;
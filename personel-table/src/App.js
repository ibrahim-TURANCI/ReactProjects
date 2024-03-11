import React, { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [LoginUsers] = useState([
    { id: 1, name: 'ibrahim Turancı', email: 'a', password: '1', isAdmin: true }, 
    { id: 2, name: 'Qwd Asc', email: 'user@gmail.com', password: '123456',isAdmin: false },
    // Diğer kullanıcılar
    
  ]);

  const [loggedInUser, setLoggedInUser] = useState(null);

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
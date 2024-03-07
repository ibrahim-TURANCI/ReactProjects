import React, { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [users] = useState([
    { id: 1, name: 'ibrahim Turancı', email: 'admin@gmail.com', password: '123456' },
    { id: 2, name: 'Qwd Asc', email: 'qwdasc@gmail.com', password: 'qwdasc44' },
    // Diğer kullanıcılar
    
  ]);

  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage users={users} setLoggedInUser={setLoggedInUser} />} />
        <Route path="/home" element={<Home loggedInUser={loggedInUser} />} />
        <Route path="/" element={<LoginPage users={users} setLoggedInUser={setLoggedInUser} />} />  {/* Başlangıç sayfası olarak LoginPage */}
      </Routes>
    </Router>
  );
};

export default App;
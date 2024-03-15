import React from 'react';
import './LoginPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ users, setLoggedInUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const foundUser = users.find(user => user.email === email && user.password === password);
        if (foundUser) {
            setLoggedInUser(foundUser);
            navigate('/home');
        } else {
            alert('Geçersiz e-posta veya şifre');
        }
    };

    return (

        <div className="section">
            <div className="container">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <h6 className="mb-0 pb-3">
                                <span>Log In </span><span>Sign Up</span>
                            </h6>
                            <input
                                className="checkbox"
                                type="checkbox"
                                id="reg-log"
                                name="reg-log"
                            />
                            <label htmlFor="reg-log"></label>
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Log In</h4>
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        name="logemail"
                                                        className="form-style"
                                                        placeholder="Your Email"
                                                        id="logemail"
                                                        autoComplete="logemail"
                                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="password"
                                                        name="logpass"
                                                        className="form-style"
                                                        placeholder="Your Password"
                                                        id="logpass"
                                                        autoComplete="current-password"
                                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <button className="btn mt-4" onClick={handleLogin}>Login</button>
                                                <p className="mb-0 mt-4 text-center">
                                                    <a href="#0" className="link">Forgot your password?</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Sign Up</h4>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        name="logname"
                                                        className="form-style"
                                                        placeholder="Your Full Name"
                                                        id="logname"
                                                        autoComplete="logname"
                                                    />
                                                    <i className="input-icon uil uil-user"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="email"
                                                        name="logemail1"
                                                        className="form-style"
                                                        placeholder="Your Email"
                                                        id="logemail1"
                                                        autoComplete="logemail1"
                                                    />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="password"
                                                        name="logpass1"
                                                        className="form-style"
                                                        placeholder="Your Password"
                                                        id="logpass1"
                                                        autoComplete="current-password"
                                                    />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <button className="btn mt-4">submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
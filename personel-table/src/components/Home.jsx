import React, { useEffect } from 'react';
import Table from "./Table";
import './Home.css';
import { useDispatch } from "react-redux";
import { setUsers } from '../reducers/userReducer';
import { fetchData } from '../Services/HttpServices';
import { useNavigate } from 'react-router-dom';

const Home = ({ loggedInUser }) => {
    const isAdmin = loggedInUser?.isAdmin || false;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
            const data = await fetchData(); // Servisi kullan
            dispatch(setUsers(data));
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };
        getData(); // fetchData fonksiyonunu çağır
    }, [dispatch]); // dispatch bağımlılığını ekleyin

    // Çıkış İşlemi
    const handleLogout = () => {
        localStorage.removeItem('loggedInUser'); // localStorage'dan kullanıcıyı temizle
        navigate('/login'); // Login sayfasına yönlendirme
    };

    return (
        <div className="App">
            <div className="header"><img src="https://ankageo.com/wp-content/uploads/2021/02/katman-2@2x.png" alt="AnkaGeo" />
                {loggedInUser && (
                    <p>
                        Logged : {loggedInUser.name} ({loggedInUser.email}) ---- Log Out
                        <span className="logout-icon" onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </span>
                    </p>
                )}
            </div>
            <Table isAdmin={isAdmin} />
        </div>
    );
}

export default Home;
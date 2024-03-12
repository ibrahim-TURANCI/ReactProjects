import React, { useEffect } from 'react';
import Table from "./Table";
import './Home.css';
import { useDispatch } from "react-redux";
import { setUsers } from '../reducers/userReducer';
import { fetchData } from '../Services'; // Servis dosyasını içe aktar



const Home = ({ loggedInUser }) => {
    const isAdmin = loggedInUser?.isAdmin || false;
    const dispatch = useDispatch()

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

    return (

        <div className="App">

            <body>
                <div className="header"><img src="https://ankageo.com/wp-content/uploads/2021/02/katman-2@2x.png" alt="AnkaGeo" />
                    {loggedInUser && (
                        <p>
                            Logged in as: {loggedInUser.name} ({loggedInUser.email})
                        </p>
                    )}
                </div>
                <Table isAdmin={isAdmin} />
            </body>
        </div>


    );
}

export default Home;
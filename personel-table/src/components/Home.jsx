import React, { useEffect } from 'react';
import Table from "./Table";
import './Home.css';
import { useDispatch } from "react-redux";
import { setAddusers } from '../reducers/userReducer';



const Home = ({ loggedInUser }) => {
    const isAdmin = loggedInUser?.isAdmin || false;
    const dispatch = useDispatch()

    const fetchData = async () => {

        try {
            const response = await fetch("http://localhost:3004/users");
            const data = await response.json();
            console.log("data: ", data);
            /*       setUserData(data); */
            for (let i = 0; i < data.length; i++) {
                const user = data[i];
                dispatch(setAddusers(data))

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };


    useEffect(() => {
        fetchData()

    }, [])

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
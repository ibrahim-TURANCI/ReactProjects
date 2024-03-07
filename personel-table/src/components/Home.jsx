import React from 'react';
import RegisterForm from "./RegisterForm";
import Table from "./Table";
import './Home.css';


const Home = ({ loggedInUser }) => {
    return (

        <div className="App">
            {loggedInUser && (
                <p>
                    Logged in as: {loggedInUser.name} ({loggedInUser.email})
                </p>
            )}
            <body>
                <div className="header"><img src="https://ankageo.com/wp-content/uploads/2021/02/katman-2@2x.png" alt="AnkaGeo" /></div>
                <RegisterForm />
                <Table />
            </body>
        </div>


    );
}

export default Home;
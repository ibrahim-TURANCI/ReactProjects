import React from 'react';
import Table from "./Table";
import './Home.css';


const Home = ({ loggedInUser }) => {
    const isAdmin = loggedInUser?.isAdmin || false;

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
                <Table isAdmin={isAdmin}/>
            </body>
        </div>


    );
}

export default Home;
import RegisterForm from "./RegisterForm";
import Table from "./Table";
import './Home.css';

function Home() {
    return ( 

        <div className="App">
            <body>
            <div className="header"><img className="logo" src="https://ankageo.com/wp-content/uploads/2021/02/katman-2@2x.png" alt="AnkaGeo"/></div>
            <RegisterForm/>
            <Table/>  
            </body>
        </div>

        
    );
}

export default Home;
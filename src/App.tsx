import React, {useEffect} from 'react';
import money from './money.jpeg';
import './App.css';
import axios from "axios";
axios.defaults.withCredentials = true;


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function App() {
    const [data, setData] = React.useState("null");
    const [data1, setData1] = React.useState("null");

    const secured = async () => {
        fetch(`${API_URL}/api/transfer-secure?amount=100&to=jjurenic@mail.com`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            return response.json();
        }).then((data) => {
            setData(data);
        });
    }

    const unsecured = async () => {
        fetch(`${API_URL}/api/transfer?amount=100&to=jjurenic@mail.com`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            return response.json();
        }).then((data) => {
            setData1(data);
        });
    }

  return (
    <div className="App">
        <h1>Najpopularnija stranica za prijenos. 100% SIGURNO ;)</h1>
        <div style={{display: "flex", flexDirection: "column"}}>
            {/*<img src={money} alt="euri"/>*/}
            <button onClick={secured}>Transfer secured</button>
            <p>Secured response:{JSON.stringify(data)}</p>
            <button onClick={unsecured}>Transfer unsecured</button>
            <p>Unsecured response:{JSON.stringify(data1)}</p>
        </div>

    </div>
  );
}

export default App;

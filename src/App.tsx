import React, {useEffect} from 'react';
import money from './money.jpeg';
import './App.css';
import axios from "axios";
axios.defaults.withCredentials = true;


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function App() {
    const [data, setData] = React.useState("null");

    useEffect(() => {
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
            setData(data);
        });
    }, []);

  return (
    <div className="App">
        <img src={money} alt="euri"/>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default App;

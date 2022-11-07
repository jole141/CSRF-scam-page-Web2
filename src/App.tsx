import React, {useEffect} from 'react';
import money from './money.jpeg';
import './App.css';
import axios from "axios";
axios.defaults.withCredentials = true;


const API_URL = process.env.REACT_APP_API_URL || "";

function App() {
    const [data, setData] = React.useState("null");

    useEffect(() => {
        axios(API_URL + '/api/transfer?amount=100&to=jjurenic@mail.com').then((response) => {
            return response.data;
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

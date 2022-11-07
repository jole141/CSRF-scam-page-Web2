import React, {useEffect} from 'react';
import money from './money.jpeg';
import './App.css';

function App() {
    const [data, setData] = React.useState("null");

    useEffect(() => {
        fetch('/api/transfer?amount=100&to=jjurenic@mail.com').then((response) => {
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

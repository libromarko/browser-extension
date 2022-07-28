import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as browser from "webextension-polyfill";
import Login from "./components/Login";

function App() {
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = async () => {
    /*     fetch('localhost:3001', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: '',
        password: ''
      })
    });
 */
    await browser.storage.local.set({ token: "token" });
    let storageToken = await browser.storage.local.get("token");
    console.log("storage token", storageToken);
    //setToken(storageToken.token);
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleLogin();
    };

    fetchData();

    if (token) {
      console.log("if token", token);
      browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
        let tab = tabs[0];
        setUrl(tab.url || "");
      });
      setIsLoading(false);
    } else {
      console.log("else token", token);
      setIsLoading(false);
    }
  }, [token]);

  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? (
          <img src={logo} className="App-logo" alt="logo" />
        ) : token ? (
          <p>{url}</p>
        ) : (
          <Login setToken={() => setToken} />
        )}
      </header>
    </div>
  );
}

export default App;

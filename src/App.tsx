import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as browser from "webextension-polyfill";
import Login from "./components/Login";
import Token from "./components/Token";

function App() {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleStorage = async () => {
    let storageToken = await browser.storage.local.get("token");
    console.log("storage token", storageToken);
    setToken(storageToken.token);
  };

  useEffect(() => {
    const fetchStorage = async () => {
      await handleStorage();
    };

    fetchStorage();

    setIsLoading(false);
  }, [token]);

  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? (
          <img src={logo} className="App-logo" alt="logo" />
        ) : token ? (
          <Token />
        ) : (
          <Login setToken={setToken} />
        )}
      </header>
    </div>
  );
}

export default App;

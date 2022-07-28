import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as browser from "webextension-polyfill";
import Login from "./components/Login";
import Bookmark from "./components/Bookmark";

function App() {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleStorage = async () => {
    let storageToken = await browser.storage.local.get("token");
    console.log("storage token", storageToken);
    setToken(storageToken.token);
    
    await userExists(storageToken.token);
  };

  const userExists = async (access_token: string) => {
    const response = await fetch("http://localhost:3001/user/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    const content = await response.json();

    console.log("content", content);

    if (content.statusCode === 500 || content.statusCode === 401) {
      await browser.storage.local.remove("token");
      setToken("");
    }
  };

  useEffect(() => {
    const fetchStorage = async () => {
      await handleStorage();
    };

    fetchStorage();

    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? (
          <img src={logo} className="App-logo" alt="logo" />
        ) : token ? (
          <Bookmark token={token} />
        ) : (
          <Login setToken={setToken} />
        )}
      </header>
    </div>
  );
}

export default App;

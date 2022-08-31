import React, { useEffect, useState } from "react";
import libromarkologo from "./libromarko_logo.png";
import "./App.css";
import * as browser from "webextension-polyfill";
import Login from "./components/Login";
import Bookmark from "./components/Bookmark";

const api = process.env.REACT_APP_API_URL;

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
    try {
      const response = await fetch(`${api}user/me`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const content = await response.json();

      console.log("content", content);

      if (
        content.statusCode === 500 ||
        content.statusCode === 401 ||
        content.statusCode === null
      ) {
        await browser.storage.local.remove("token");
        setToken("");
      }
    } catch (error) {
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
          <img src={libromarkologo} style={{ height: "40vmin" }} alt="logo" />
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

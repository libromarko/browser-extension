import React, { useState } from "react";
import * as browser from "webextension-polyfill";
import logo from "../logo.svg";

interface ChildProps {
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export default function Login({ setToken }: ChildProps) {
  const [formData, setFormData] = useState({});

  const handleChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    const response = await fetch("http://localhost:3001/auth/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const content = await response.json();

    console.log("content", content);
    if (content.access_token) {
      await browser.storage.local.set({ token: content.access_token });
      setToken(content.access_token);
    }
  };

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <input
        onChange={handleChange}
        placeholder="email"
        name="email"
        type="text"
      />
      <input
        onChange={handleChange}
        placeholder="password"
        name="password"
        type="text"
      />
      <button onClick={() => handleLogin()} className="button button-login">
        LOGIN
      </button>
    </>
  );
}

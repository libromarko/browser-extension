import React, { useState } from "react";
import * as browser from "webextension-polyfill";
import libromarkologo from "../libromarko_logo.png";

const api = process.env.REACT_APP_API_URL;

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
    const response = await fetch(`${api}auth/signin`, {
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
      <img src={libromarkologo} style={{ height: "40vmin" }} alt="logo" />
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
        type="password"
      />
      <button onClick={() => handleLogin()} className="button button-login">
        LOGIN
      </button>

      <a href="https://libromarko.xyz" target="_blank" rel="noreferrer" >
        Sign Up
      </a>
    </>
  );
}

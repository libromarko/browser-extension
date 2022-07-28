import React, { useState } from "react";
import logo from "../logo.svg";

interface LoginProps {
  setToken: () => void;
}

export default function Login({ setToken }: LoginProps) {
  const [formData, setFormData] = useState({});

  const handleOnChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const handleLogin = () => {
    console.log('form data', formData);

  }

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <input onChange={handleOnChange} placeholder="email" name="email" type="text" />
      <input onChange={handleOnChange} placeholder="password" name="password" type="text" />
      <button onClick={() => handleLogin()} className="button button1">login</button>
    </>
  );
}

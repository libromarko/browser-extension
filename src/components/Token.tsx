import React, { useEffect, useState } from "react";
import * as browser from "webextension-polyfill";
import logo from "../logo.svg";

export default function Token() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
      let tab = tabs[0];
      setUrl(tab.url || "");
    });
  });
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <button onClick={() => console.log('save:', url)} className="button button1">save</button>
    </>
  );
}

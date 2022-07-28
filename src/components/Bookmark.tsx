import React, { useEffect, useState } from "react";
import * as browser from "webextension-polyfill";
import logo from "../logo.svg";

interface ChildProps {
  token: string;
}

export default function Bookmark({ token }: ChildProps) {
  const [url, setUrl] = useState("");
  const [formData, setFormData] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
      let tab = tabs[0];
      setUrl(tab.url || "");
    });
  });

  const handleChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    const data = {
      url: url,
      ...formData,
    };

    const response = await fetch("http://localhost:3001/bookmark", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const content = await response.json();

    console.log("content", content);

    if (
      content.statusCode !== 400 &&
      content.statusCode !== 500 &&
      content.statusCode !== 401
    ) {
      console.log("content.statusCode:", content.statusCode);
      setIsSaved(true);
    } else {
      setIsError(true);
    }
  };

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      {!isSaved ? (
        <>
          <input
            onChange={handleChange}
            placeholder="summary"
            name="summary"
            type="text"
          />
          <button
            onClick={() => isError ? null : handleSave()}
            className={`button button-save ${isError ? "disabled" : null}`}
          >
            SAVE
          </button>
        </>
      ) : null}
    </>
  );
}

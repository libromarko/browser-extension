import React, { useEffect, useState } from "react";
import * as browser from "webextension-polyfill";
import logo from "../logo.svg";

interface ChildProps {
  token: string;
}

interface Group {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default function Bookmark({ token }: ChildProps) {
  const [url, setUrl] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [formData, setFormData] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchGroup = async () => {
      await handleGroup();
    }

    fetchGroup();

    browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
      let tab = tabs[0];
      setUrl(tab.url || "");
    });
  }, []);

  const handleGroup = async () => {
    const response = await fetch("http://localhost:3001/group/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });

    const content = await response.json();
    console.log('User Groups:', content);

    if (
      content.statusCode !== 400 &&
      content.statusCode !== 500 &&
      content.statusCode !== 401
    ) {
      setGroups(content);
    }
  };

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
      groupId: selectedGroupId
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
          <div className="dropdown">
            <button className="dropbtn">Please Select</button>
            <div className="dropdown-content">
              {(groups || []).map((group: Group) => (
                <a onClick={() => setSelectedGroupId(group.id)} href="#">{group.name}</a>
              ))}
            </div>
          </div>
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

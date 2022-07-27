import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as browser from 'webextension-polyfill';

function App() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
      let tab = tabs[0];
      setUrl(tab.url || '');
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {url}
        </p>
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import Main from './Main';
import './App.css';
import {UserProvider} from "./UserContext"
function App() {
  return (
    <div>
      <UserProvider>
        <Main/>
      </UserProvider>
    </div>
  );
}

export default App;

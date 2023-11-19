import React from "react";
import axios from "axios"
import Home from "./components/Home";

const apiCall = ()=>{
  axios.get("http://localhost:8000")
  .then(data =>{
    console.log(data)
  })
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Home />
      </header>
    </div>
  );
}

export default App;

import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import NotFound from "./pages/Notfound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
// import axios from "axios"
// import Home from "./components/Home";

// const apiCall = ()=>{
//   axios.get("http://localhost:8000")
//   .then(data =>{
//     console.log(data)
//   })
// }

const App = ()=> {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <BrowserRouter>
          <Routes>
            <Route path = "/" element = {<Home />}/>
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

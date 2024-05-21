// This is the main code for the web app

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import About from "./Pages/About";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<Home/>}></Route>
          <Route path = "/en-about" element={<About/>}></Route>
          <Route path = "/en-signin" element={<Signin/>}></Route>
          <Route path = "/en-signup" element={<Signup/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

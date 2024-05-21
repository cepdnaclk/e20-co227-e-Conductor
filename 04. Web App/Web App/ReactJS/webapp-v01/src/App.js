// This is the main code for the web app

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<Home/>}></Route>
          <Route path = "/signin" element={<Signin/>}></Route>
          <Route path = "/signup" element={<Signup/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

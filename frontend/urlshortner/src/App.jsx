import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./component/home";
import Login from "./component/login";
import Register from "./component/resgister";

import { Bounce, ToastContainer, toast } from "react-toastify";
import { Contextfuntion } from "./context/context";
import Urllist from "./component/urllist";
function App() {
  return (
    <>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Contextfuntion>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/url" element={<Urllist />} />
          </Routes>
        </Contextfuntion>
      </BrowserRouter>
    </>
  );
}

export default App;

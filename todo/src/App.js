import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Firstpg from "./Mycomponents/firstpg";
import Login from "./Mycomponents/login";
import SignUp from "./Mycomponents/signup";
import Dashboard from "./Mycomponents/dashboard";


export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Firstpg />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
  );
}

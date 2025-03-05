import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Firstpg from "./Mycomponents/firstpg";
import Login from "./Mycomponents/login";
import SignUp from "./Mycomponents/signup";
import Dashboard from "./Mycomponents/dashboard";
import Settings from "./Mycomponents/settings";

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Firstpg />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings/>}/>
        </Routes>
      </Router>
  );
}

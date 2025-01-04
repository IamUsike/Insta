import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WinstagramLanding from "./components/WinstagramLanding";
import InstagramLogin from "./components/InstagramLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WinstagramLanding />} />
        <Route path="/instagram-login" element={<InstagramLogin />} />
      </Routes>
    </Router>
  );
}

export default App;

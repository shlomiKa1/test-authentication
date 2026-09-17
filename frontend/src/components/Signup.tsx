import { useState, type FormEvent } from "react";
import type { User } from "../App";
import { useFetch } from "../hooks/useFetch";

interface LoginProps {
  onSignup: () => void;
}

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validtionError, setValidationError] = useState<string | null>(null);

  const signup = useFetch<User>();
  const login = useFetch<User>();
  const current_user = useFetch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const resSignup = await signup.execute({
      method: "post",
      endpoint: "/signup",
      data: { email, password, username },
    });

    if (!resSignup) setValidationError("לא סיסמה או שם");
    if (resSignup)
      await login.execute({
        method: "post",
        endpoint: "/login",
        data: { email, password },
      });

    if (!current_user) setValidationError("User Not exsits");
  };

  const loading = signup.loading || current_user.loading;
  const error = signup.error || validtionError || current_user.error;

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Signup</button>
    </form>
  );
};

export default Signup;

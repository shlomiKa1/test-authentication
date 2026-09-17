import { useState, type FormEvent } from "react";
import type { User } from "../App";
import { useFetch } from "../hooks/useFetch";

interface LoginProps {
  onLogin: (token: string) => void;
  // onSignup: () => void;
}
const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validtionError, setValidationError] = useState<string | null>(null);

  const login = useFetch<User>();
  const current_user = useFetch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await login.execute({
      method: "post",
      endpoint: "/login",
      data: { email, password },
    });
    onLogin(res);

    if (!res) setValidationError("לא סיסמה או שם");
    if (!current_user) setValidationError("User Not exsits");
  };
  const loading = login.loading || current_user.loading;
  const error = login.error || validtionError || current_user.error;

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
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

      <button>Login</button>
    </form>
  );
};

export default Login;

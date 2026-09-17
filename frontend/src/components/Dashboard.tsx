import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import type { User } from "../App";
import Login from "./Login";

const Dashboard = () => {
  const { data, loading, error, execute } = useFetch<User>();
  const logout = useFetch();

  useEffect(() => {
    execute({ method: "get", endpoint: "/current_user" });
  }, []);

  const handleLogout = async () => {
    await logout.execute({ method: "get", endpoint: "/logout" });
    return <Login onLogin={() => {}} />;
  };

  if (error) return <p>{error}</p>;
  if (loading) return <p>loading...</p>;
  if (!data) return <p>Error at loading</p>;

  return (
    <div>
      <h1>Hello {data.username}</h1>
      <p>{data.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;

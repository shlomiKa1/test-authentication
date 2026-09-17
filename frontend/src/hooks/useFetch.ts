import { useState } from "react";
import api from "../api";
import type { User } from "../App";

type HttpMethods = "get" | "post" | "put" | "patch" | "delete";

interface Execute {
  method: HttpMethods;
  endpoint: string;
  data?: User;
  params?: string;
}

export function useFetch<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async ({ method, endpoint, data, params }: Execute) => {
    setError(null);
    setLoading(true);
    api.patch("", {});
    try {
      const res = ["post", "patch", "update"].includes(method)
        ? await api[method](endpoint, data)
        : await api[method](endpoint, params);
      setData(res.data);
      return res.data;
    } catch (err) {
      setError(err ? (err as Error).message : "שגיאה לא ידוע");
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
}

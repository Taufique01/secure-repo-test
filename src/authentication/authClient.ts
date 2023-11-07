import { useEffect, useRef, useState } from "react";
export enum Status {
  Error,
  AuthError,
  Success,
  NotStarted,
}

export const useLoginPost = () => {
  const [status, setStatus] = useState<Status>(Status.NotStarted);
  const mounted = useRef(true);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    return function cleanup() {
      mounted.current = false;
    };
  }, []);

  return {
    setLogin: (payload: LoginType) => {
      (async () => {
        setStatus(Status.NotStarted);
        const response = await fetch("/api/auth/login/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...payload, username: "taufique" }),
        });

        if (response.status === 400) {
          mounted.current && setStatus(Status.AuthError);
          return;
        } else if (response.status === 200) {
          const responseJson = await response.json();
          mounted.current && setToken(responseJson.key);
          mounted.current && setStatus(Status.Success);
          return;
        }

        mounted.current && setStatus(Status.Error);
      })();
    },
    status: status,
    token: token,
  };
};

export type LoginType = { email: string; password: string };

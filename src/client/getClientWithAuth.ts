import { useEffect, useState } from "react";
import { useAuthentication } from "../auth-provider/AuthProvider";
import { useFetch } from "./useFetch";

export const useGetClientWithAuth = <DataType>(url: string) => {
  const [data, setData] = useState<DataType | undefined>(undefined);
  const { token } = useAuthentication();
  console.log(token,"token----------------------------");

  const { response, trigger, status } = useFetch<DataType>(
    () => ({
      input: url,
      init: {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      },
    }),
    [token, url],
    {
      acceptedStatus: 200,
    }
  );

  useEffect(() => {
    setData(response);
  }, [response]);

  return { data: data, reloadData: trigger, status: status };
};

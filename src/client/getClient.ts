import { useEffect, useState } from "react";
import { useAuthentication } from "../auth-provider/AuthProvider";
import { useFetch } from "./useFetch";

export const useGetClient = <DataType>(url: string) => {
  const [data, setData] = useState<DataType | undefined>(undefined);

  const { response, trigger } = useFetch<DataType>(
    () => ({
      input: url,
    }),
    [url],
    {
      acceptedStatus: 200,
    }
  );

  useEffect(() => {
    setData(response);
  }, [response]);

  return { data: data, reloadData: trigger };
};

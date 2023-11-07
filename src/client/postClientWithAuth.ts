import { useEffect, useRef, useState } from "react";
import { useAuthentication } from "../auth-provider/AuthProvider";
import { Status } from "./status";

export const usePostClientWithAuth = <ResponseType>(
  url: string,
  acceptedStatus?: StatusCode,
  parseJson?: true
) => {
  const [status, setStatus] = useState<Status>(Status.NotStarted);
  const [responseData, setResponseData] = useState<ResponseType | undefined>(
    undefined
  );
  const { token } = useAuthentication();
  const mounted = useRef(true);

  useEffect(() => {
    return function cleanup() {
      mounted.current = false;
    };
  }, []);

  return {
    postData: async (requestData: unknown) => {
      setStatus(Status.Pending);
      setResponseData(undefined);
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
        body: JSON.stringify(requestData),
      });

      const isResponseSuccess =
        (acceptedStatus === undefined &&
          (response.status == 200 || response.status == 201)) ||
        response.status === acceptedStatus;

      if (isResponseSuccess) {
        if (parseJson === true) {
          const parsedJsonResponse = await response.json();
          mounted.current && setResponseData(parsedJsonResponse);
        }
        mounted.current && setStatus(Status.Success);
        return;
      }

      mounted.current && setStatus(Status.Error);
    },
    status: status,
    responseData,
  };
};

export enum StatusCode {
  Success = 200,
  Created = 201,
}

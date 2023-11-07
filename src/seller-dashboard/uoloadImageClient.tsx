import { useEffect, useRef, useState } from "react";
import { useAuthentication } from "../auth-provider/AuthProvider";
import { Status } from "../client/status";

export const useUploadImageClient = (url: string) => {
  const { token } = useAuthentication();
  const [status, setStatus] = useState<Status>(Status.NotStarted);
  const mounted = useRef(true);

  useEffect(() => {
    return function cleanup() {
      mounted.current = false;
    };
  }, []);

  return {
    uploadProductImage: async (imageFile: File) => {
      const data = new FormData();
      data.append("file", imageFile);

      setStatus(Status.Pending);

      const response = await fetch(url, {
        method: "post",
        headers: {
          Authorization: "Token " + token,
        },
        body: data,
      });

      if (response.status === 201) {
        mounted.current && setStatus(Status.Success);
        return;
      }

      mounted.current && setStatus(Status.Error);
    },

    status: status,
  };
};

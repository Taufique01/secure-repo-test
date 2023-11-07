import { useFetch } from "../client/useFetch";
import { useAuthentication } from "../auth-provider/AuthProvider";

export function useDeleteClient() {
  const { token } = useAuthentication();

  return useFetch(
    () => ({
      init: {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      },
    }),
    [token],
    {
      acceptedStatus: 200,
      autoTrigger: false,
      parseJson: false,
    }
  );
}

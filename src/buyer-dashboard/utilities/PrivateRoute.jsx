import { Navigate } from "react-router-dom";
import { useAuthentication } from "../../auth-provider/AuthProvider";

export const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useAuthentication();

  if (isLoggedIn) {
    return children;
  }

  return <Navigate to="/signin" />;
};

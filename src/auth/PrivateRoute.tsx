import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import config from "@/configs";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  if (!user) {
    return (
      <>
        <Navigate to={config.routes.login} replace />
      </>
    );
  }
  return <>{children}</>;
};

export default PrivateRoute;

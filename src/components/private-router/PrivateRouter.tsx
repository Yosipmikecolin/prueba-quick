import { Navigate, Outlet } from "react-router-dom";

interface Props {
  isAuthenticated: boolean;
  isLoginComponent: boolean;
}

const PrivateRoute = ({ isAuthenticated, isLoginComponent }: Props) => {
  return isLoginComponent ? (
    isAuthenticated ? (
      <Navigate to="/pokemons" />
    ) : (
      <Outlet />
    )
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;

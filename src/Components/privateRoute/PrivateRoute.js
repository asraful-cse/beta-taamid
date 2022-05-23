import {Redirect , Route } from "react-router-dom";
import useAuth from "./useAuth";

export default function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return <Route {...rest}>{auth ? children : <Redirect to="/login" />}</Route>;
}

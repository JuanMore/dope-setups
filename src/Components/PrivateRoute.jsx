import { Navigate, Outlet } from "react-router-dom"
import useAuthStatus from "../hooks/useAuthStatus"
import Spinner from "./UI/Spinner"
function PrivateRoute() {
    const {loggedIn, checkingStatus} = useAuthStatus()

    // check if true

    if (checkingStatus) {
        return <Spinner />
    }
  return loggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
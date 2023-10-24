import { useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const AuthLayout = ({ children }) => {
  const { isReady, user, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!(isAuthenticated && user)) {
    return
  }

  return children
}

export default AuthLayout
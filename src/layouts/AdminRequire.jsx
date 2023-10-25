import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useEffect } from "react"

const AdminRequire = ({ children }) => {
  const { isAdmin, isReady } = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!isReady) {
      return
    }

    if (!isAdmin) {
      return navigate('/')
    }
  }, [isAdmin, isReady])

  return children
}

export default AdminRequire
import { CssBaseline } from "@mui/material"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import { Outlet } from "react-router-dom"

const HeaderLayout = () => {
  const {isReady} = useAuth()

  if (!isReady) {
    return
  }

  return (
    <>
      <CssBaseline />
      <Header />
      <Outlet />
    </>
  )
}

export default HeaderLayout
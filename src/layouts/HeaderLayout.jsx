import { Box, CssBaseline } from "@mui/material"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import { Outlet } from "react-router-dom"

const HeaderLayout = ({children}) => {
  const { isReady, user, isAuthenticated } = useAuth()

  if (!isReady || (isAuthenticated && !user)) {
    return
  }

  return (
    <>
      <CssBaseline />
      <Header />
      <Box sx={{pt: '64px'}}>
        {children}
      </Box>
    </>
  )
}

export default HeaderLayout
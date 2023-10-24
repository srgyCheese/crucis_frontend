import { Box, CssBaseline } from "@mui/material"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import { Outlet } from "react-router-dom"

const HeaderLayout = () => {
  const { isReady, isUserLoading } = useAuth()

  if (!isReady && isUserLoading) {
    return
  }

  return (
    <>
      <CssBaseline />
      <Header />
      <Box sx={{pt: '64px'}}>
        <Outlet />
      </Box>
    </>
  )
}

export default HeaderLayout
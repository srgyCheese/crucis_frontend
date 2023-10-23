import { Box, Container, CssBaseline, Stack, TextField, ThemeProvider, createTheme } from "@mui/material"
import Header from "./components/Header"
import Post from "./components/Post"
import useAuth from "./hooks/useAuth"
import Posts from "./pages/Posts/Posts"

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const App = () => {
  const {isReady} = useAuth()

  if (!isReady) {
    return
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Posts />
      {/* <Box sx={{ maxWidth: '910px', margin: 'auto', width: '100%', mt: 2, px: 2 }}>

      </Box> */}
    </ThemeProvider>
  )
}

export default App

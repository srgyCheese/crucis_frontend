import { Box, CssBaseline, Stack, TextField, ThemeProvider, createTheme } from "@mui/material"
import Header from "./components/Header"
import Post from "./components/Post"
import useAuth from "./hooks/useAuth"
import './lib/zod'

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
      <Box sx={{ maxWidth: '910px', margin: 'auto', width: '100%', mt: 2 }}>
        <TextField
          placeholder="Напишите что-нибудь"
          multiline
          fullWidth
          minRows={3}
        />
        <Stack sx={{mt: 4}} gap={3} direction="column" useFlexGap>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </Stack>
      </Box>
    </ThemeProvider>
  )
}

export default App

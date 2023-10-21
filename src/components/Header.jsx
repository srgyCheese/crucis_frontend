import { AppBar, Backdrop, Box, Button, Container, Fade, Link, Modal, TextField, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import AuthModal from "./AuthModal"

const Header = () => {
  const [modalOpened, setModalOpened] = useState(false)

  return (
    <>
      <AuthModal open={modalOpened} onClose={() => setModalOpened(false)} />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Логотип
            </Typography>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              МалыйЛоготип
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

            </Typography>
            <Button color="inherit" onClick={e => setModalOpened(true)}>Войти</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Header
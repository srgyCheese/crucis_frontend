import { AppBar, Backdrop, Box, Button, Container, Fade, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Popover, TextField, Toolbar, Typography } from "@mui/material"
import { useRef, useState } from "react"
import { Link } from 'react-router-dom'
import AuthModal from "./AuthModal"
import useAuth from "../hooks/useAuth"
import ColoredAvatar from "./ColoredAvatar"
import { ExitToApp, Person } from "@mui/icons-material"

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth()
  const avatarRef = useRef()
  const [modalOpened, setModalOpened] = useState(false)
  const [isPopoverOpened, setIsPopoverOpened] = useState(false)

  return (
    <>
      <AuthModal open={modalOpened} onClose={() => setModalOpened(false)} />
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component={({ children }) => <Link to='/'>{children}</Link>}
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
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="42" height="42" rx="10" fill="#212121" />
                <path d="M21 17.5C20.2044 17.5 19.4413 17.8161 18.8787 18.3787C18.3161 18.9413 18 19.7044 18 20.5C18 21.2956 18.3161 22.0587 18.8787 22.6213C19.4413 23.1839 20.2044 23.5 21 23.5C21.7956 23.5 22.5587 23.1839 23.1213 22.6213C23.6839 22.0587 24 21.2956 24 20.5C24 19.7044 23.6839 18.9413 23.1213 18.3787C22.5587 17.8161 21.7956 17.5 21 17.5ZM21 25.5C19.6739 25.5 18.4021 24.9732 17.4645 24.0355C16.5268 23.0979 16 21.8261 16 20.5C16 19.1739 16.5268 17.9021 17.4645 16.9645C18.4021 16.0268 19.6739 15.5 21 15.5C22.3261 15.5 23.5979 16.0268 24.5355 16.9645C25.4732 17.9021 26 19.1739 26 20.5C26 21.8261 25.4732 23.0979 24.5355 24.0355C23.5979 24.9732 22.3261 25.5 21 25.5ZM21 13C16 13 11.73 16.11 10 20.5C11.73 24.89 16 28 21 28C26 28 30.27 24.89 32 20.5C30.27 16.11 26 13 21 13Z" fill="#F5F5F5" />
                <path d="M25.6973 25L36.0676 35.6642" stroke="#F5F5F5" />
                <path d="M6.69727 5L17.0676 15.6642" stroke="#F5F5F5" />
                <path d="M17.0122 23.9175L5.99998 36.317" stroke="#F5F5F5" />
                <line x1="34.0595" y1="5.34464" x2="24.0596" y2="15.8553" stroke="#F5F5F5" />
              </svg>
            </Typography>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />

            {isAuthenticated ? (
              <>
                <ColoredAvatar
                  firstName={user.first_name}
                  lastName={user.last_name}
                  avatarUrl={user.avatar_url}
                  sx={{ cursor: 'pointer' }}
                  ref={avatarRef}
                  onClick={e => setIsPopoverOpened(true)}
                />
                <Popover
                  open={isPopoverOpened}
                  anchorEl={avatarRef.current}
                  onClose={e => setIsPopoverOpened(false)}
                  onClick={e => setIsPopoverOpened(false)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top'
                  }}
                  disableScrollLock
                >
                  <List dense>
                    <ListItem disablePadding>
                      <Link to={`/users/${user.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        <ListItemButton onClick={e => setIsPostEditing(true)}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Person />
                          </ListItemIcon>
                          <ListItemText primary='Профиль' />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                    <ListItem disablePadding onClick={e => deletePost.mutate({ id }, { onSuccess: onDelete })}>
                      <ListItemButton onClick={logout}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <ExitToApp />
                        </ListItemIcon>
                        <ListItemText primary='Выйти' />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Popover>
              </>
            ) : (
              <Button color="inherit" onClick={e => setModalOpened(true)}>Войти</Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Header
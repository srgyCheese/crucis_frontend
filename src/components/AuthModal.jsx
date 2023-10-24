import { Backdrop, Box, Button, Fade, Grid, Link, Modal, TextField, Typography } from "@mui/material"
import { useState } from "react"
import LoginForm from "./LoginForm"
import RegistrationForm from "./RegistrationForm"

const AuthModal = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          px: 1
        }}>
          <Box sx={{
            width: '100%',
            maxWidth: '640px',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            mx: 'auto',
            p: 5,
          }}>
            {isLogin ? (
              <LoginForm onSuccess={onClose} goToRegister={() => setIsLogin(false)} />
            ) : (
              <RegistrationForm onSuccess={onClose} goToLogin={() => setIsLogin(true)} />
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default AuthModal
import { Backdrop, Box, Button, Fade, Grid, Link, Modal, TextField, Typography } from "@mui/material"
import { useState } from "react"

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
          width: 640,
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          p: 5,
        }}>
          {isLogin ? (
            <>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Вход
              </Typography>

              <TextField
                label="Почта"
                type="email"
                autoComplete="email"
                fullWidth
                sx={{ mt: 3 }}
              />

              <TextField
                label="Пароль"
                type="password"
                autoComplete="current-password"
                fullWidth
                sx={{ mt: 2 }}
              />

              <Typography sx={{ mt: 3 }} align="center">
                Нет аккаунта? <Link href="#" onClick={e => {
                  e.preventDefault()

                  setIsLogin(false)
                }}>Зарегистрируйтесь!</Link>
              </Typography>

              <Button variant="contained" sx={{ mt: 5, fontWeight: 600 }} fullWidth size="large">Войти</Button>
            </>
          ) : (
            <>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Регистрация
              </Typography>

              <Grid container spacing={2} sx={{mt: 1}}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Имя"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Фамилия"
                    type="text"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <TextField
                label="Почта"
                type="email"
                autoComplete="email"
                fullWidth
                sx={{ mt: 3 }}
              />

              <TextField
                label="Пароль"
                type="password"
                autoComplete="current-password"
                fullWidth
                sx={{ mt: 2 }}
              />

              <TextField
                label="Повтор пароля"
                type="password"
                autoComplete="current-password"
                fullWidth
                sx={{ mt: 2 }}
              />

              <Typography sx={{ mt: 3 }} align="center">
                Есть аккаунт? <Link href="#" onClick={e => {
                  e.preventDefault()

                  setIsLogin(true)
                }}>Войдите!</Link>
              </Typography>

              <Button variant="contained" sx={{ mt: 5, fontWeight: 600 }} fullWidth size="large">Зарегистрироваться</Button>
            </>
          )}
        </Box>
      </Fade>
    </Modal>
  )
}

export default AuthModal
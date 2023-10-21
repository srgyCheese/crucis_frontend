import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from "../queries/authQueries"
import { Button, Link, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import useAuth from "../hooks/useAuth"

const schema = z.object({
  email: z.string().email({ message: 'Неверный формат почты' }).max(255),
  password: z
    .string()
    .min(6, { message: 'Должен быть от 6 символов' })
    .max(64),
})

const LoginForm = ({ goToRegister, onSuccess }) => {
  const login = useLogin()
  const auth = useAuth()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async data => {
    login.mutate(data, {
      onSuccess: ({ token }) => {
        auth.login(token)
        onSuccess()
      },
      onError: ({ response }) => {
        const { errors, message } = response.data

        if (errors) {
          Object.keys(errors).forEach(error => {
            setError(error, {
              message: errors[error][0]
            })
          })
        }

        if (message) {
          setError('email', {message})
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography id="modal-modal-title" variant="h5" component="h2">
        Вход
      </Typography>

      <TextField
        label="Почта"
        type="email"
        autoComplete="email"
        fullWidth
        sx={{ mt: 3 }}

        error={!!errors.email?.message}
        helperText={errors.email?.message}
        {...register('email')}
      />

      <TextField
        label="Пароль"
        type="password"
        autoComplete="current-password"
        fullWidth
        sx={{ mt: 2 }}

        error={!!errors.password?.message}
        helperText={errors.password?.message}
        {...register('password')}
      />

      <Typography sx={{ mt: 3 }} align="center">
        Нет аккаунта? <Link href="#" onClick={e => {
          e.preventDefault()

          goToRegister()
        }}>Зарегистрируйтесь!</Link>
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 5, fontWeight: 600 }}
        fullWidth
        size="large"
        type='submit'
        disabled={login.isPending}
      >
        Войти
      </Button>
    </form>
  )
}

export default LoginForm
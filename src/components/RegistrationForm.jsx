import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegister } from "../queries/authQueries"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import useAuth from "../hooks/useAuth"

const schema = z
  .object({
    first_name: z.string().min(2).max(255),
    last_name: z.string().min(2).max(255),
    email: z.string().email({ message: 'Неверный формат почты' }).max(255),
    password: z
      .string()
      .min(6, { message: 'Должен быть длинее 6 символов' })
      .max(64),
    password_confirmation: z
      .string()
      .min(1, { message: 'Введите повтор пароля' }),
  })
  .superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Пароли должны совпадать',
        path: ['password_confirmation']
      })
    }
  })

const RegistrationForm = ({ goToLogin, onSuccess }) => {
  const registerMutation = useRegister()
  const auth = useAuth()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  })

  const onSubmit = async data => {
    registerMutation.mutate(data, {
      onSuccess: ({ token }) => {
        auth.login(token)
      },
      onError: ({ response }) => {
        const { errors } = response.data

        if (errors) {
          Object.keys(errors).forEach(error => {
            setError(error, {
              message: errors[error][0]
            })
          })
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography id="modal-modal-title" variant="h5" component="h2">
        Регистрация
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Имя"
            type="text"
            fullWidth

            error={!!errors.first_name?.message}
            helperText={errors.first_name?.message}
            {...register('first_name')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Фамилия"
            type="text"
            fullWidth

            error={!!errors.last_name?.message}
            helperText={errors.last_name?.message}
            {...register('last_name')}
          />
        </Grid>
      </Grid>

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

      <TextField
        label="Повтор пароля"
        type="password"
        autoComplete="current-password"
        fullWidth
        sx={{ mt: 2 }}

        error={!!errors.password_confirmation?.message}
        helperText={errors.password_confirmation?.message}
        {...register('password_confirmation')}
      />

      <Typography sx={{ mt: 3 }} align="center">
        Есть аккаунт? <Link href="#" onClick={e => {
          e.preventDefault()

          goToLogin()
        }}>Войдите!</Link>
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 5, fontWeight: 600 }}
        fullWidth
        size="large"
        type="submit"
        disabled={registerMutation.isPending}
      >Зарегистрироваться</Button>
    </form>
  )
}

export default RegistrationForm
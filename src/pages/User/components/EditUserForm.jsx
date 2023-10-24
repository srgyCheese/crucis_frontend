import { Box, Button, CardHeader, IconButton, TextField } from "@mui/material"
import ColoredAvatar from "../../../components/ColoredAvatar"
import { Edit } from "@mui/icons-material"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEditProfile } from "../../../queries/authQueries"

const schema = z.object({
  first_name: z.string().min(2).max(255),
  last_name: z.string().min(2).max(255),
})

const EditUserForm = ({ discard, avatarUrl, firstName, lastName, email, userId }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: firstName,
      last_name: lastName,
      email: email,
    }
  })
  const editUser = useEditProfile()

  const onSubmit = data => {
    editUser.mutate(data, {
      onSuccess: discard
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          label='Имя'
          fullWidth

          error={!!errors.first_name?.message}
          helperText={errors.first_name?.message}
          {...register('first_name')}
        />
        <TextField
          label='Фамилия'
          fullWidth

          error={!!errors.last_name?.message}
          helperText={errors.last_name?.message}
          {...register('last_name')}
        />
      </Box>
      <TextField
        label='Почта'
        sx={{mt: 1}}
        disabled
        fullWidth

        error={!!errors.email?.message}
        helperText={errors.email?.message}
        {...register('email')}
      />

      <Button sx={{mt: 1}} type="submit" disabled={editUser.isPending}>Сохранить</Button>
    </form>
  )
}

export default EditUserForm
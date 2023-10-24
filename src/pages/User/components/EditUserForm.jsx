import { Avatar, Box, Button, CardHeader, IconButton, TextField } from "@mui/material"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEditProfile } from "../../../queries/authQueries"

const schema = z.object({
  first_name: z.string().min(2).max(255),
  last_name: z.string().min(2).max(255),
  avatar: z.any().optional()
})

const EditUserForm = ({ discard, avatarUrl, firstName, lastName, email, userId }) => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: firstName,
      last_name: lastName,
      email: email,
    }
  })
  const fileList = watch('avatar')
  const fileUrl = fileList?.[0] ? URL.createObjectURL(fileList[0]) : null

  const editUser = useEditProfile()

  const onSubmit = data => {
    editUser.mutate({
      ...data,
      avatar: data.avatar?.[0]
    }, {
      onSuccess: discard
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <label htmlFor='avatar'>
          <input
            type='file'
            accept='image/png, image/gif, image/jpeg'
            id='avatar'
            hidden
            {...register('avatar')}
          />
          <Avatar src={fileUrl || avatarUrl} sx={{ width: '100px', height: '100px', cursor: 'pointer' }} />
        </label>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
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
            sx={{ mt: 1 }}
            disabled
            fullWidth

            error={!!errors.email?.message}
            helperText={errors.email?.message}
            {...register('email')}
          />
        </Box>
      </Box>
      <Button sx={{ mt: 1 }} type="submit" disabled={editUser.isPending}>Сохранить</Button>
    </form>
  )
}

export default EditUserForm
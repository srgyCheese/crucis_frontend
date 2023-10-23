import { Send } from "@mui/icons-material"
import { Box, Button, TextField } from "@mui/material"
import { z } from "zod"
import { useCreatePost } from "../../../queries/postQueries"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useAuth from "../../../hooks/useAuth"

const schema = z.object({
  text: z.string().min(1).max(3000),
})

const CreatePostForm = () => {
  const {user} = useAuth()
  const createPost = useCreatePost()

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = data => {
    createPost.mutate({...data, user_id: user.id}, {
      onSuccess: () => reset()
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          placeholder="Напишите что-нибудь"
          multiline
          fullWidth
          minRows={3}

          error={!!errors.text?.message}
          helperText={errors.text?.message}
          {...register('text')}
        />
        <Button
          endIcon={<Send />}
          variant="text"
          sx={{ ml: 'auto', mt: 1 }}
          disabled={createPost.isPending}
          type="submit"
        >Создать</Button>
      </Box>
    </form>
  )
}

export default CreatePostForm
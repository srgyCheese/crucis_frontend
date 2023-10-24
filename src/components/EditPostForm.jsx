import { Box, Button, TextField } from "@mui/material"
import { useEditPost } from "../queries/postQueries"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"

const schema = z.object({
  text: z
    .string()
    .min(1)
    .max(3000),
})

const EditPostForm = ({ postId, text, discard }) => {
  const editPost = useEditPost()

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { text }
  })

  const onSubmit = data => {
    editPost.mutate({...data, postId}, {
      onSuccess: discard
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextField
          multiline
          fullWidth
          minRows={3}
          placeholder="Введите текст"

          error={!!errors.text?.message}
          helperText={errors.text?.message}
          {...register('text')}
        />
        <Box sx={{display: 'flex', gap: 2, justifyContent: 'flex-end'}}>
          <Button sx={{ mt: 2 }} type="submit" disabled={editPost.isPending}>Сохранить</Button>
          <Button sx={{ mt: 2 }} color="error" onClick={discard}>Отмена</Button>
        </Box>
      </Box>
    </form>
  )
}

export default EditPostForm
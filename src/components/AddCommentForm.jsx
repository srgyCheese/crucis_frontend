import { Send } from "@mui/icons-material"
import { Box, IconButton, TextField } from "@mui/material"
import { z } from "zod"
import { useAddComment } from "../queries/postQueries"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const schema = z.object({
  text: z
    .string()
    .min(1)
    .max(64),
})

const AddCommentForm = ({ postId }) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
  })

  const addComment = useAddComment()

  const onSubmit = data => {
    addComment.mutate({...data, post_id: postId}, {
      onSuccess: () => reset()
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 1,
      }}>
        <TextField
          placeholder="Введите комментарий"
          sx={{ width: '100%' }}
          multiline

          error={!!errors.text?.message}
          helperText={errors.text?.message}
          {...register('text')}
        />
        <IconButton size="large" type="submit" disabled={addComment.isPending}>
          <Send />
        </IconButton>
      </Box>
    </form>
  )
}

export default AddCommentForm
import { Backdrop, Box, Container, Fade, Modal, Stack } from "@mui/material"
import CreatePostForm from "./components/CreatePostForm"
import PostList from "../../components/PostList"
import { useSearchParams } from "react-router-dom"
import FullPost from "../../components/FullPost"

const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const postId = searchParams.get('postId')

  const close = () => {
    searchParams.delete('postId')
    setSearchParams(searchParams)
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Modal
        open={postId !== null}
        onClose={close}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{
          overflow: 'auto'
        }}
      >
        <Fade in={postId !== null}>
          <Box sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: 640,
            width: '100%',
            borderRadius: 3,
            pb: 5,
            pt: 10,
            outline: 'none'
          }}>
            <Box sx={{
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 3,
              overflow: 'hidden',
            }}>
              {postId !== null && <FullPost id={+postId} close={close} />}
            </Box>
          </Box>
        </Fade>
      </Modal>
      <CreatePostForm />
      <PostList />
    </Container>
  )
}

export default Posts
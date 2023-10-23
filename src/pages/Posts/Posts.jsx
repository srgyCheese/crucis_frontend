import { Backdrop, Box, Container, Fade, Modal, Stack } from "@mui/material"
import CreatePostForm from "./components/CreatePostForm"
import PostList from "../../components/PostList"
import { useSearchParams } from "react-router-dom"
import FullPost from "../../components/FullPost"

const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const postId = searchParams.get('postId')

  return (
    <Container sx={{ mt: 2 }}>
      <Modal
        open={postId !== null}
        onClose={e => {
          searchParams.delete('postId')
          setSearchParams(searchParams)
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={postId !== null}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 640,
            width: '100%',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
          }}>
            {postId !== null && <FullPost id={+postId} />}
          </Box>
        </Fade>
      </Modal>
      <CreatePostForm />
      <PostList />
    </Container>
  )
}

export default Posts
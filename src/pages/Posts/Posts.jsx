import { Backdrop, Box, Container, Fade, Modal, Stack } from "@mui/material"
import CreatePostForm from "./components/CreatePostForm"
import PostList from "../../components/PostList"
import { useSearchParams } from "react-router-dom"
import FullPost from "../../components/FullPost"
import PostModal from "../../components/PostModal"

const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const postId = searchParams.get('postId')

  const close = () => {
    searchParams.delete('postId')
    setSearchParams(searchParams)
  }

  return (
    <Container sx={{ mt: 2 }}>
      <PostModal close={close} postId={postId} />
      <CreatePostForm />
      <PostList />
    </Container>
  )
}

export default Posts
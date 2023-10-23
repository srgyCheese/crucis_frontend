import { Container, Stack } from "@mui/material"
import CreatePostForm from "./components/CreatePostForm"
import PostList from "../../components/PostList"

const Posts = () => {
  return (
    <Container sx={{ mt: 2 }}>
      <CreatePostForm />
      <PostList />
    </Container>
  )
}

export default Posts
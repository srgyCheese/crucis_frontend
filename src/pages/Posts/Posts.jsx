import { Box, Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import CreatePostForm from "./components/CreatePostForm"
import PostList from "../../components/PostList"
import { useSearchParams } from "react-router-dom"
import FullPost from "../../components/FullPost"
import PostModal from "../../components/PostModal"
import { useState } from "react"

const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('created_at')
  const postId = searchParams.get('postId')

  const close = () => {
    searchParams.delete('postId')
    setSearchParams(searchParams)
  }

  return (
    <Container sx={{ mt: 2 }}>
      <PostModal close={close} postId={postId} />
      <CreatePostForm />
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        Сортировать
        <FormControl>
          <Select
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <MenuItem value={'created_at'}>Сначала новые</MenuItem>
            <MenuItem value={'no'}>Сначала старые</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <PostList params={sort === 'created_at' && {sort: [sort]}} />
    </Container>
  )
}

export default Posts
import { Container, Stack } from "@mui/material"
import Post from "./Post"
import { usePosts } from "../queries/postQueries"
import { useEffect, useRef } from "react"
import { useIntersection } from "@mantine/hooks"

const PostList = () => {
  const {data, isLoading, fetchNextPage, isError} = usePosts()

  const showMoreRef = useRef()

  const { entry, ref } = useIntersection({
    root: showMoreRef.current,
    threshold: 1
  })

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry])

  if (isLoading) {
    return
  }

  if (isError) {
    return 'Произошла ошибка'
  }

  const posts = data.pages?.flatMap(page => page.data)

  if (!posts?.length) {
    return (
      <Stack gap={3} direction="column" useFlexGap>
        Нет постов
      </Stack>
    )
  }

  return (
    <Stack sx={{ mt: 4 }} gap={3} direction="column" useFlexGap>
      {posts.map(post => (
        <Post
          key={post.id}
          text={post.text}
          createdAt={post.createdAt}
          firstName={post.user.first_name}
          lastName={post.user.last_name}
          avatarUrl={post.user.avatar_url}
        />
      ))}
      <div ref={ref}>...</div>
    </Stack>
  )
}

export default PostList
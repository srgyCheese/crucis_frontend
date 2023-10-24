import { Stack } from "@mui/material"
import Post from "./Post"
import { usePosts } from "../queries/postQueries"
import { useEffect, useRef } from "react"
import { useIntersection } from "@mantine/hooks"
import { useSearchParams } from "react-router-dom"

const PostList = ({params}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { data, isLoading, fetchNextPage, isError } = usePosts(params)
  const showMoreRef = useRef()

  const { entry, ref } = useIntersection({
    root: showMoreRef.current,
    threshold: 1
  })

  useEffect(() => {
    if (entry?.isIntersecting && data.pages.at(-1).meta.to) {
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
          id={post.id}
          userId={post.user.id}
          onCommentsClick={e => {
            searchParams.set('postId', post.id)
            setSearchParams(searchParams)
          }}
          text={post.text}
          createdAt={post.createdAt}
          firstName={post.user.first_name}
          lastName={post.user.last_name}
          avatarUrl={post.user.avatar_url}
          comments={post.comments}
        />
      ))}
      <div ref={ref} />
    </Stack>
  )
}

export default PostList
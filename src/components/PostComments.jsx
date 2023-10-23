import { useIntersection } from "@mantine/hooks"
import { usePostComments } from "../queries/postQueries"
import React, { useEffect, useRef } from "react"
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import ColoredAvatar from "./ColoredAvatar"

const PostComments = ({ postId }) => {
  const postCommentsQuery = usePostComments({ postId })
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

  if (postCommentsQuery.isLoading) {
    return
  }

  if (postCommentsQuery.isError) {
    return 'Произошла ошибка'
  }

  const comments = postCommentsQuery.data.pages?.flatMap(page => page.data)

  if (!comments?.length) {
    return
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {comments.map(comment => (
        <React.Fragment key={comment.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <ColoredAvatar avatarUrl={comment.user.avatar_url} firstName={comment.user.first_name} lastName={comment.user.last_name} />
            </ListItemAvatar>
            <ListItemText
              primary={`${comment.user.first_name} ${comment.user.last_name}`}
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {comment.text}
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
      <div ref={showMoreRef} />
    </List>
  )
}

export default PostComments
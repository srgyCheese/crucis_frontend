import { useIntersection } from "@mantine/hooks"
import { useDeleteComment, usePostComments } from "../queries/postQueries"
import React, { useEffect, useRef, useState } from "react"
import { Box, Divider, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Popover, Typography } from "@mui/material"
import ColoredAvatar from "./ColoredAvatar"
import dayjs from "dayjs"
import { Delete, MoreVert } from "@mui/icons-material"
import useAuth from "../hooks/useAuth"

const Comment = ({ avatarUrl, firstName, lastName, createdAt, text, id, userId }) => {
  const { user } = useAuth()
  const [isPopoverOpened, setIsPopoverOpened] = useState(false)
  const deleteComment = useDeleteComment()
  const anchorRef = useRef()

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <ColoredAvatar avatarUrl={avatarUrl} firstName={firstName} lastName={lastName} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {firstName} {lastName}
              </Typography>
              <Box>
                <Typography
                  sx={{ display: 'inline', textTransform: 'capitalize' }}
                  component="span"
                  variant="caption"
                  color="text.secondary"
                >
                  {dayjs(createdAt).format('MMMM DD, hh:mm')}
                </Typography>

                {user.id === userId && <><Box sx={{ display: 'inline-block', maxHeight: '30px', ml: 1 }}>
                  <IconButton ref={anchorRef} onClick={e => setIsPopoverOpened(true)}>
                    <MoreVert />
                  </IconButton>
                </Box>

                  <Popover
                    open={isPopoverOpened}
                    anchorEl={anchorRef.current}
                    onClose={e => setIsPopoverOpened(false)}
                    onClick={e => setIsPopoverOpened(false)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    disableScrollLock
                  >
                    <List dense>
                      <ListItem disablePadding>
                        <ListItemButton onClick={e => {
                          deleteComment.mutate({ id })
                        }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Delete />
                          </ListItemIcon>
                          <ListItemText primary='Удалить' />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Popover>
                </>}
              </Box>
            </Box>
          }
          secondary={
            <Typography
              sx={{ display: 'inline', wordWrap: 'break-word' }}
              component="div"
              variant="body2"
              color="text.primary"
            >
              {text}
            </Typography>
          }
        />
      </ListItem>
      {deleteComment.isPending && <LinearProgress />}
    </>
  )
}

const PostComments = ({ postId }) => {
  const postCommentsQuery = usePostComments({ postId })
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
      {comments.map((comment, i) => (
        <React.Fragment key={comment.id}>
          <Comment
            id={comment.id}
            avatarUrl={comment.user.avatar_url}
            firstName={comment.user.first_name}
            lastName={comment.user.last_name}
            createdAt={comment.created_at}
            text={comment.text}
            userId={comment.user.id}
          />
          {comments.length - 1 !== i && <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))}
      <div ref={showMoreRef} />
    </List>
  )
}

export default PostComments
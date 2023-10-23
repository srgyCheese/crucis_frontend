import { Button, Card, CardActions, CardContent, CardHeader, IconButton, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, TextField, Typography } from '@mui/material'
import { Share, Comment, MoreVert, Delete, Edit } from '@mui/icons-material'
import dayjs from 'dayjs'
import ColoredAvatar from './ColoredAvatar'
import { useRef, useState } from 'react'
import EditPostForm from './EditPostForm'
import { useDeletePost } from '../queries/postQueries'

const Post = ({ id, text, firstName, lastName, avatarUrl, createdAt, onCommentsClick, comments, onDelete }) => {
  const anchorRef = useRef()
  const deletePost = useDeletePost()
  const [isPopoverOpened, setIsPopoverOpened] = useState(false)

  const [isPostEditing, setIsPostEditing] = useState(false)

  return (
    <Card>
      <CardHeader
        avatar={<ColoredAvatar avatarUrl={avatarUrl} firstName={firstName} lastName={lastName} />}
        title={`${firstName} ${lastName}`}
        subheader={dayjs(createdAt).format('MMMM DD, YYYY')}
        subheaderTypographyProps={{
          textTransform: 'capitalize'
        }}
        action={
          <>
            <IconButton aria-label='more' onClick={e => setIsPopoverOpened(true)} ref={anchorRef}>
              <MoreVert />
            </IconButton>

            <Popover
              open={isPopoverOpened}
              anchorEl={anchorRef.current}
              onClose={e => setIsPopoverOpened(false)}
              onClick={e => setIsPopoverOpened(false)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <List dense>
                <ListItem disablePadding>
                  <ListItemButton onClick={e => setIsPostEditing(true)}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Edit fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Изменить' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={e => deletePost.mutate({ id }, { onSuccess: onDelete })}>
                  <ListItemButton>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Delete fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Удалить' />
                  </ListItemButton>
                </ListItem>
              </List>
            </Popover>
          </>
        }
      />
      <CardContent>
        {isPostEditing ? <EditPostForm postId={id} text={text} discard={e => setIsPostEditing(false)} /> : text}
      </CardContent>
      <CardActions sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <Button
          size='large'
          variant='text'
          color='inherit'
          sx={{ borderRadius: 10 }}
          startIcon={<Comment fontSize='large' />}
          onClick={onCommentsClick}
        >
          {comments}
        </Button>
        <IconButton aria-label='share'>
          <Share />
        </IconButton>
      </CardActions>
      {(deletePost.isPending || deletePost.isSuccess) && <LinearProgress />}
    </Card>
  )
}

export default Post
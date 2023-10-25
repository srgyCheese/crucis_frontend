import { Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, TextField, Typography } from '@mui/material'
import { Share, Comment, MoreVert, Delete, Edit } from '@mui/icons-material'
import dayjs from 'dayjs'
import ColoredAvatar from './ColoredAvatar'
import { useRef, useState } from 'react'
import EditPostForm from './EditPostForm'
import { useDeletePost } from '../queries/postQueries'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import SharePostModal from './SharePostModal'
import { blue } from '@mui/material/colors'

const Post = ({ id, text, firstName, lastName, avatarUrl, createdAt, onCommentsClick, comments, onDelete, userId, clipped }) => {
  const { user, isAdmin } = useAuth()
  const anchorRef = useRef()
  const deletePost = useDeletePost()
  const [isPopoverOpened, setIsPopoverOpened] = useState(false)

  const [isPostEditing, setIsPostEditing] = useState(false)
  const [isSharePopupOpened, setIsSharePopupOpened] = useState(false)

  return (
    <Card>
      <SharePostModal
        postId={id}
        onClose={() => setIsSharePopupOpened(false)}
        open={isSharePopupOpened}
      />
      <CardHeader
        avatar={(
          <Link to={`/users/${userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ColoredAvatar avatarUrl={avatarUrl} firstName={firstName} lastName={lastName} />
          </Link>
        )}
        title={<Link to={`/users/${userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>{firstName} {lastName}</Link>}
        subheader={dayjs(createdAt).format('MMMM DD, YYYY')}
        subheaderTypographyProps={{
          textTransform: 'capitalize'
        }}
        action={(isAdmin || (user && user.id === userId)) && <>
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
            disableScrollLock
          >
            <List dense>
              {!(isAdmin && user?.id != userId) && (
                <ListItem disablePadding>
                  <ListItemButton onClick={e => setIsPostEditing(true)}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Edit fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Изменить' />
                  </ListItemButton>
                </ListItem>
              )}
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
      <CardContent sx={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}>
        {isPostEditing ? <EditPostForm postId={id} text={text} discard={e => setIsPostEditing(false)} /> : (
          <Box>
            {text}{clipped && ' '}{clipped && (
              <Typography sx={{ display: 'inline-block', fontWeight: '600', cursor: 'pointer', color: blue[500] }} onClick={onCommentsClick}>Читать далее...</Typography>
            )}
          </Box>
        )}
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
        <IconButton aria-label='share' onClick={() => setIsSharePopupOpened(true)}>
          <Share />
        </IconButton>
      </CardActions>
      {(deletePost.isPending || deletePost.isSuccess) && <LinearProgress />}
    </Card>
  )
}

export default Post
import { useParams, useSearchParams } from "react-router-dom"
import { useUser } from "../../queries/userQueries"
import { Box, Card, CardHeader, Container, IconButton } from "@mui/material"
import ColoredAvatar from "../../components/ColoredAvatar"
import PostList from "../../components/PostList"
import PostModal from "../../components/PostModal"
import useAuth from "../../hooks/useAuth"
import { Close, Edit } from "@mui/icons-material"
import { useState } from "react"
import EditUserForm from "./components/EditUserForm"

const User = () => {
  const { userId } = useParams()
  const { user } = useAuth()
  const [isUserEditing, setIsUserEditing] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const postId = searchParams.get('postId')

  const close = () => {
    searchParams.delete('postId')
    setSearchParams(searchParams)
  }

  const userQuery = useUser({
    id: userId
  })

  if (userQuery.isLoading) {
    return
  }

  if (userQuery.isError) {
    return 'Ошибка'
  }

  return (
    <Container>
      <PostModal close={close} postId={postId} />
      <CardHeader
        avatar={
          <ColoredAvatar
            avatarUrl={userQuery.data.avatar_url}
            firstName={userQuery.data.first_name}
            lastName={userQuery.data.last_name}
            sx={{ height: '50px', width: '50px', fontSize: '25px' }}
          />
        }
        title={`${userQuery.data.first_name} ${userQuery.data.last_name}`}
        subheader={`${userQuery.data.posts} постов • ${userQuery.data.comments} комментариев`}
        titleTypographyProps={{
          variant: 'h5'
        }}

        action={(user && user.id == userId) && (
          isUserEditing ? (
            <IconButton onClick={e => setIsUserEditing(false)}>
              <Close />
            </IconButton>
          ) : (
            <IconButton onClick={e => setIsUserEditing(true)}>
              <Edit />
            </IconButton>
          )
        )}
      />

      {isUserEditing ? (
        <EditUserForm
          discard={() => setIsUserEditing(false)}
          avatarUrl={userQuery.data.avatar_url}
          firstName={userQuery.data.first_name}
          lastName={userQuery.data.last_name}
          email={userQuery.data.email}
          userId={+userId}
        />
      ) : (
        <PostList params={{
          user_id: userId
        }} />
      )}
    </Container>
  )
}

export default User
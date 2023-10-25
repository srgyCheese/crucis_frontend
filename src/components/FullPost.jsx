import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import { usePost, usePostComments } from "../queries/postQueries"
import Post from "./Post";
import { Send } from "@mui/icons-material";
import AddCommentForm from "./AddCommentForm";
import PostComments from "./PostComments";
import useAuth from "../hooks/useAuth";

const FullPost = ({ id, close }) => {
  const postQuery = usePost({ id })
  const {isAuthenticated} = useAuth()

  if (postQuery.isLoading) {
    return
  }

  return (
    <Box>
      <Post
        id={id}
        userId={postQuery.data.user.id}
        avatarUrl={postQuery.data.user.avatar_url}
        firstName={postQuery.data.user.first_name}
        lastName={postQuery.data.user.last_name}
        createdAt={postQuery.data.created_at}
        comments={postQuery.data.comments}
        likes={postQuery.data.likes}
        liked={postQuery.data.liked}
        text={postQuery.data.text}
        onDelete={close}
      />
      {isAuthenticated && <AddCommentForm postId={id} />}
      <PostComments postId={id} />
    </Box>
  )
}

export default FullPost
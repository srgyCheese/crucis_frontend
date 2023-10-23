import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import { usePost, usePostComments } from "../queries/postQueries"
import Post from "./Post";
import { Send } from "@mui/icons-material";
import AddCommentForm from "./AddCommentForm";
import PostComments from "./PostComments";

const FullPost = ({ id, close }) => {
  const postQuery = usePost({ id })

  if (postQuery.isLoading) {
    return
  }

  return (
    <Box>
      <Post
        id={id}
        avatarUrl={postQuery.data.user.avatar_url}
        firstName={postQuery.data.user.first_name}
        lastName={postQuery.data.user.last_name}
        createdAt={postQuery.data.created_at}
        comments={postQuery.data.comments}
        text={postQuery.data.text}
        onDelete={close}
      />
      <AddCommentForm postId={id} />
      <PostComments postId={id} />
    </Box>
  )
}

export default FullPost
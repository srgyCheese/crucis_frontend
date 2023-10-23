import { Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton } from "@mui/material"
import { Share, Comment } from '@mui/icons-material'
import dayjs from "dayjs"
import ColoredAvatar from "./ColoredAvatar"

const Post = ({ text, firstName, lastName, avatarUrl, createdAt, onCommentsClick, comments }) => {
  return (
    <Card>
      <CardHeader
        avatar={<ColoredAvatar avatarUrl={avatarUrl} firstName={firstName} lastName={lastName} />}
        title={`${firstName} ${lastName}`}
        subheader={dayjs(createdAt).format('MMMM DD, YYYY')}
        subheaderTypographyProps={{
          textTransform: 'capitalize'
        }}
      />
      <CardContent>
        {text}
      </CardContent>
      <CardActions sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}>
        <Button
          size="large"
          variant="text"
          color="inherit"
          sx={{ borderRadius: 10 }}
          startIcon={<Comment fontSize="large" />}
          onClick={onCommentsClick}
        >
          {comments}
        </Button>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Post
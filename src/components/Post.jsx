import { Avatar, Badge, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material"
import { Share, Comment } from '@mui/icons-material'
import dayjs from "dayjs"

function stringToColor(string) {
  let hash = 0
  let i;
  
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }

  return color
}

const Post = ({ text, firstName, lastName, avatarUrl, createdAt }) => {
  return (
    <Card>
      <CardHeader
        avatar={avatarUrl ? (
          <Avatar src={avatarUrl} />
        ) : (
          <Avatar sx={{ bgcolor: stringToColor(`${firstName} ${lastName}`) }}>
            {firstName[0]}
          </Avatar>
        )}
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
        >
          64
        </Button>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Post
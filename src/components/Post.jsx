import { Avatar, Badge, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material"
import { Share, Comment } from '@mui/icons-material'
import dayjs from "dayjs"

const colorsArray = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FF8000", "#8000FF", "#00FF80", "#FF0080"]

function nameToColor(str) {
  const index = str.charCodeAt(0) % colorsArray.length

  return colorsArray[index]
}

const Post = ({ text, firstName, lastName, avatarUrl, createdAt }) => {
  return (
    <Card>
      <CardHeader
        avatar={avatarUrl ? (
          <Avatar src={avatarUrl} />
        ) : (
          <Avatar sx={{ bgcolor: nameToColor(firstName) }}>
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
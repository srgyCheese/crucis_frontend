import { Avatar, Badge, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material"
import { Share, Comment } from '@mui/icons-material'
import { red } from "@mui/material/colors"

const Post = () => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            М
          </Avatar>
        }
        title="Максим Марцинкевич"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography paragraph>Method:</Typography>
        <Typography paragraph>
          Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
          aside for 10 minutes.
        </Typography>
        <Typography paragraph>
          Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
          medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
          occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
          large plate and set aside, leaving chicken and chorizo in the pan. Add
          pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
          stirring often until thickened and fragrant, about 10 minutes. Add
          saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
        </Typography>
        <Typography paragraph>
          Add rice and stir very gently to distribute. Top with artichokes and
          peppers, and cook without stirring, until most of the liquid is absorbed,
          15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
          mussels, tucking them down into the rice, and cook again without
          stirring, until mussels have opened and rice is just tender, 5 to 7
          minutes more. (Discard any mussels that don&apos;t open.)
        </Typography>
        <Typography>
          Set aside off of the heat to let rest for 10 minutes, and then serve.
        </Typography>
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
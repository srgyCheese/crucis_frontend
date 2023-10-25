import { Backdrop, Box, Fade, Modal } from "@mui/material"
import FullPost from "./FullPost"

const PostModal = ({ postId, close }) => {
  return (
    <Modal
      open={postId !== null}
      onClose={close}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      sx={{
        overflow: 'auto'
      }}
    >
      <Fade in={postId !== null}>
        <Box sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 640,
          width: '100%',
          borderRadius: 3,
          pb: 5,
          pt: 10,
          outline: 'none'
        }}>
          <Box sx={{ px: 1 }}>
            <Box sx={{
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 3,
              overflow: 'hidden',
            }}>
              {postId !== null && <FullPost id={+postId} close={close} />}
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default PostModal
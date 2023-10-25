import { Box, Container, Typography } from "@mui/material"

const NotFound = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 64px)' }}>
      <Typography variant="h1" fontWeight='bold' letterSpacing='0.18438em'>
        404
      </Typography>
    </Box>
  )
}

export default NotFound
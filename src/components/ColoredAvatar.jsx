import { Avatar } from "@mui/material"
import { forwardRef } from "react";

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

const ColoredAvatar = forwardRef(({ avatarUrl, firstName, lastName, sx, onClick }, ref) => {
  if (avatarUrl) {
    return <Avatar src={avatarUrl} ref={ref} onClick={onClick} />
  }

  return (
    <Avatar sx={{ bgcolor: stringToColor(`${firstName} ${lastName}`), ...sx }} onClick={onClick} ref={ref}>
      {firstName[0]}
    </Avatar>
  )
})

export default ColoredAvatar
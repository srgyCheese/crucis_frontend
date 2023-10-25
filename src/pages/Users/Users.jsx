import { Container, IconButton, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useDeleteUser, useUsers } from "../../queries/userQueries"
import ColoredAvatar from "../../components/ColoredAvatar"
import { ArrowBack, ArrowForward, Delete, MoreVert } from "@mui/icons-material"
import { useEffect, useRef, useState } from "react"
import { useIntersection } from "@mantine/hooks"
import { Link } from "react-router-dom"

const UserListItem = ({ avatarUrl, firstName, lastName, email, id }) => {
  const [isPopoverOpened, setIsPopoverOpened] = useState(false)
  const deleteUser = useDeleteUser()
  const anchorRef = useRef()

  return (
    <TableRow sx={{ position: 'relative' }}>
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell>
        <ColoredAvatar
          avatarUrl={avatarUrl}
          firstName={firstName}
          lastName={lastName}
        />
      </TableCell>
      <TableCell>{firstName}</TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell align="right">
        <IconButton onClick={e => setIsPopoverOpened(true)} ref={anchorRef}>
          <MoreVert />
        </IconButton>
        <Popover
          open={isPopoverOpened}
          anchorEl={anchorRef.current}
          onClose={e => setIsPopoverOpened(false)}
          onClick={e => setIsPopoverOpened(false)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          disableScrollLock
        >
          <List dense>
            <ListItem disablePadding>
              <Link to={`/users/${id}`} target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <ArrowForward fontSize='small' />
                  </ListItemIcon>
                  <ListItemText primary='Перейти' />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem disablePadding onClick={e => deleteUser.mutate({ id })}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Delete fontSize='small' />
                </ListItemIcon>
                <ListItemText primary='Удалить' />
              </ListItemButton>
            </ListItem>
          </List>
        </Popover>
      </TableCell>

      {(deleteUser.isPending || deleteUser.isSuccess) && (
        <LinearProgress sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
      )}
    </TableRow>
  )
}

const Users = () => {
  const usersQuery = useUsers()

  const showMoreRef = useRef()

  const { entry, ref } = useIntersection({
    root: showMoreRef.current,
    threshold: 1
  })

  useEffect(() => {
    if (entry?.isIntersecting && usersQuery.data.pages.at(-1).meta.to) {
      usersQuery.fetchNextPage()
    }
  }, [entry])

  if (usersQuery.isLoading) {
    return
  }

  if (usersQuery.isError) {
    return 'Произошла ошибка'
  }

  const users = usersQuery.data.pages?.flatMap(page => page.data)

  return (
    <Container>
      <TableContainer component={Paper} sx={{ my: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Аватар</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Фамилия</TableCell>
              <TableCell>Почта</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ '& tr:last-child td, & tr:last-child th': { border: 0 } }}>
            {users.map(user => (
              <UserListItem
                key={user.id}
                id={user.id}
                avatarUrl={user.avatar_url}
                firstName={user.first_name}
                lastName={user.last_name}
                email={user.email}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div ref={ref} />
    </Container>
  )
}

export default Users
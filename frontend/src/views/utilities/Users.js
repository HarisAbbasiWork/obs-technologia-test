import React, { useState, useEffect } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { useSelector } from 'react-redux';

const UsersDisplay = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const accessToken = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    getUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSearch = () => {
    getUsers();
  };

  const getUsers = async () => {
    const config = {
      method: 'get',
      url: `http://localhost:3001/user/?page=1&limit=10&search=${search}`,
      headers: { 'Authorization': `Bearer ${accessToken}` }
    };

    try {
      const response = await axios(config);
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (userId) => {
    const config = {
      method: 'delete',
      url: `http://localhost:3001/user/${userId}`,
      headers: { 'Authorization': `Bearer ${accessToken}` }
    };

    try {
      await axios(config);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setSnackbarMessage(error.response.data.message);
        setSnackbarOpen(true);
      } else {
        console.error('Error deleting user:', error);
      }
    }
  };

  const openUserDetail = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleUpdateUser = async () => {
    const config = {
      method: 'patch',
      url: `http://localhost:3001/user/${selectedUser._id}`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      data: selectedUser
    };

    try {
      await axios(config);
      setOpenDialog(false);
      setUsers(users.map(user => user._id === selectedUser._id ? selectedUser : user));
    } catch (error) {
      console.error('Error updating user:', error);
      setSnackbarMessage('Failed to update user.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <MainCard title="Users" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Search Users"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Middle Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Phone Number</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.middleName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.phoneNumber}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleDelete(user._id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => openUserDetail(user)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            value={selectedUser?.firstName}
            onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })}
          />
          <TextField
            margin="dense"
            id="middleName"
            label="Middle Name"
            type="text"
            fullWidth
            value={selectedUser?.middleName}
            onChange={(e) => setSelectedUser({ ...selectedUser, middleName: e.target.value })}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={selectedUser?.lastName}
            onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={selectedUser?.email}
            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
          />
          <TextField
            margin="dense"
            id="phoneNumber"
            label="Phone Number"
            type="text"
            fullWidth
            value={selectedUser?.phoneNumber}
            onChange={(e) => setSelectedUser({ ...selectedUser, phoneNumber: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateUser} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </MainCard>
  );
};

export default UsersDisplay;

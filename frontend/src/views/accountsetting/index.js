import { useState } from 'react';
import { Typography, Button, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios'; // Import Axios

const changePasswordApi = async (newPassword) => {
  try {
    console.log("newPassword ",newPassword)
    let data = JSON.stringify({
      "password": newPassword
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/user/changepassword',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg1ZDc1ZWJiZDc3OTcxZDc2NzBiMmEiLCJpYXQiOjE3MDMzMjgwODEsImV4cCI6MTcwMzMzMzQ4MX0.OZNFF6tEyhPhLrbf2huXfHIgGZ_GS6Ys86Y4iEMhprs'
      },
      data: data
    };

    // Use 'await' to execute the API request
    const response = await axios.request(config);

    console.log(JSON.stringify(response.data));

    // Simulating API response
    return { success: true, message: 'Password changed successfully' };
  } catch (error) {
    console.error('Error changing password:', error);
    return { success: false, message: 'Failed to change password' };
  }
};


const AccountSetting = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    // Perform validation here if needed

    // Call the changePasswordApi function
    const result = await changePasswordApi(newPassword);

    // Update the message based on the API response
    setMessage(result.message);
  };

  return (
    <MainCard title="Change Password">
      <TextField
        label="New Password"
        type="password"
        fullWidth
        margin="normal"
        variant="outlined"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleChangePassword}>
        Change Password
      </Button>
      {message && <Typography color={message.includes('success') ? 'success' : 'error'}>{message}</Typography>}
    </MainCard>
  );
};

export default AccountSetting;

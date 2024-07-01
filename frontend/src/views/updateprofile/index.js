import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

// Mock API function (replace this with actual API call)
const updateProfileApi = async (profileData) => {
  try {
    // Mock API endpoint
    const apiUrl = 'http://localhost:3001/user/';

    // Simulate API call using fetch
    const response = await fetch(apiUrl, {
      method: 'PUT', // 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg1ZDc1ZWJiZDc3OTcxZDc2NzBiMmEiLCJpYXQiOjE3MDMzMzEzMzksImV4cCI6MTcwMzMzNjczOX0.PB_ScQwa9bA0NdmNlDhS49jl4G2VPOoTVvKMimC0tyk',
      },
      body: JSON.stringify(profileData),
    });

    // Simulating API response
    const data = await response.json();

    if (response.ok) {
      console.log("dataaa ",data);
      alert(data.message)
    } else {
      console.error(data);
      alert("Failed to update profile")
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    alert("Failed to update profile")
    return { success: false, message: 'Failed to update profile' };
  }
};

const UpdateProfile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Haris Abbasi2',
    address: 'house#370, st#5, G-10/1',
    image: 'jjj',
    dateOfBirth: '12-08-1998',
  });

  const handleUpdateProfile = async () => {
    const result = await updateProfileApi(profileData);
    console.log(result);

    // Handle success or error based on the 'result'
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <MainCard title="Update Profile">
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        name="name"
        value={profileData.name}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Address"
        name="address"
        value={profileData.address}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Image"
        name="image"
        value={profileData.image}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Date of Birth"
        name="dateOfBirth"
        value={profileData.dateOfBirth}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
        Update Profile
      </Button>
    </MainCard>
  );
};

export default UpdateProfile;

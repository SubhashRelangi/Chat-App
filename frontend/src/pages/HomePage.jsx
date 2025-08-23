import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5005/messages/users', {
          withCredentials: true, // 👈 This sends cookies with the request
        });
        setUsers(response.data);
        console.log('Fetched users:', response.data);
      } catch (error) {
        console.error('Error fetching users:', error.response?.data || error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>HomePage</h2>
    </div>
  );
};

export default HomePage;
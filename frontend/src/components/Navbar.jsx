import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js';

const Navbar = () => {
  const {authUser, isCheckingAuth} = useAuthStore();
  return (
    <div>Navbar</div>
  )
}

export default Navbar
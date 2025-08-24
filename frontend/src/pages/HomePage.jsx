import React, { useState } from 'react';
import NoSelectedUser from '../components/NoChatSeleted';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import { useChatStore } from '../store/useChatStore';

const HomePage = () => {
  const {selectedUser} = useChatStore();

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">

      <Sidebar />

      <div className="flex-1 overflow-hidden">
        {selectedUser ? (
          <div className="h-full flex items-center justify-center">
            <ChatContainer />
          </div>
        ) : (
          <NoSelectedUser />
        )}
      </div>
    </div>
  );
};

export default HomePage;
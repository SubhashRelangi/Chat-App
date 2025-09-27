import React, { useState } from 'react';
import NoSelectedUser from '../components/NoChatSeleted';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import { useChatStore } from '../store/useChatStore';

const HomePage = () => {
  const {selectedUser} = useChatStore();

  return (
    <div className="flex w-full bg-base-100 text-base-content">

      <Sidebar />

      <div className="flex-1 flex">
        {selectedUser ? (
            <ChatContainer />
        ) : (
          <NoSelectedUser />
        )}
      </div>
    </div>
  );
};

export default HomePage;
import { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './skeletons/SidebarSkeleton';

export default function UserSidebar({ onSelectUser }) {
    const { users, getUsers, setSelectedUser, selectedUser, isUserLoading } = useChatStore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (isUserLoading) {
        return (
            <SidebarSkeleton />
        );
    }

    return (
        <div className="w-72 bg-base-200 backdrop-blur-md border-r border-base-content/10 h-screen overflow-y-auto p-4 space-y-4">
            <h2 className="text-base-content text-lg font-semibold mb-2">Chats</h2>
            {users.map(user => (
                <div
                    key={user._id}
                    onClick={() => onSelectUser(user)}
                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-base-300 hover:scale-[1.02]"
                >
                    <img
                        src={user.profilePic}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover border border-base-content/20"
                    />
                    <div className="flex justify-between items-center flex-1">
                        <span className="text-base-content font-medium">{user.username}</span>
                        <span
                            className={`w-2 h-2 rounded-full ${user.isOnline ? 'bg-success' : 'bg-neutral'
                                }`}
                        ></span>
                    </div>
                </div>
            ))}
        </div>
    );
}
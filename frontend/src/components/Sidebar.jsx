import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return (
      <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col items-center justify-center">
        <span className="loading loading-spinner text-primary"></span>
      </aside>
    );
  }

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col bg-base-100 transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden lg:block">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
           <button
             key={user._id}
             onClick={() => setSelectedUser(user)}
             className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
             `}
           >
             <div className="relative mx-auto lg:mx-0">
               <img
                 src={user.profilePic || "/avatar.png"}
                 alt={user.fullName}
                 className="size-12 object-cover rounded-full"
               />
               {onlineUsers.includes(user._id) && (
                 <span className="absolute bottom-0 right-0 size-3 bg-success rounded-full ring-2 ring-base-100" />
               )}
             </div>

             <div className="hidden lg:block text-left min-w-0">
               <div className="font-medium truncate">{user.fullName}</div>
               <div className="text-sm text-base-content/70">
                 {onlineUsers.includes(user._id) ? "Online" : "Offline"}
               </div>
             </div>
           </button>
        ))}

        {users.length === 0 && (
          <div className="text-center text-base-content/50 py-4 hidden lg:block">No contacts found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

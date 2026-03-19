import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import MessageInput from './MessageInput';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-base-100 overflow-hidden">
      {/* Header */}
      <div className="navbar bg-base-200 border-b border-base-300">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={selectedUser.profilePic || "/avatar.png"} alt="avatar" />
              </div>
            </div>
            <div>
              <p className="font-bold">{selectedUser.fullName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isMe = message.senderId === authUser._id;
          return (
            <div key={message._id} className={`chat ${isMe ? 'chat-end' : 'chat-start'}`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full border border-base-300">
                  <img
                    alt="avatar"
                    src={isMe ? (authUser.profilePic || "/avatar.png") : (selectedUser.profilePic || "/avatar.png")}
                  />
                </div>
              </div>
              <div className="chat-header mb-1 text-xs opacity-50">
                {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className={`chat-bubble flex flex-col ${isMe ? 'chat-bubble-primary' : 'chat-bubble-base-200'} shadow-sm`}>
                {message.image && (
                  <img src={message.image} alt="attachment" className="max-w-[200px] mb-2 rounded-md object-cover" />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
        
        {messages.length === 0 && (
          <div className="text-center text-base-content/50 py-10">Send a message to start chatting</div>
        )}
        <div ref={messageEndRef}></div>
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;

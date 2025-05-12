import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import { User } from './components/interfaces';
import Content from './components/content';

function App() {
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>(() => {
    // localStorage is a recognized global value, yet linter throws error.
    // eslint-disable-next-line no-undef
    const saved = localStorage.getItem('users');
    // JSON.parse is parsing to an array of Users, recognized by the function, not any type
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return saved ? JSON.parse(saved) : [];
  });

  //defaults
  const [mode, setMode] = useState<string>("match");
  const currentUser = users.find(user => user.username === currentUsername) || null;

  //make sure the users value is always updated
  useEffect(() => {
    // eslint-disable-next-line no-undef
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <div className="font-[Outfit] flex flex-row gap-2 w-screen h-screen bg-gray-800 text-[#FCFAFA]">
      <Sidebar
        currentUser={currentUser} 
        setCurrentUsername={setCurrentUsername}
        users={users} 
        setUsers={setUsers}
        mode={mode} 
        setMode={setMode}
      />
      <Content
        currentUser={currentUser}
        users={users}
        setUsers={setUsers}
        mode={mode}
        setMode={setMode}
      />
    </div>
  );
}

export default App;

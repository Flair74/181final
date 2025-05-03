import React, { useCallback, useState } from 'react';
import '../App.css';
import { User } from './interfaces';

interface SidebarProps {
    currentUser: User | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  }

  const Sidebar: React.FC<SidebarProps> = (props) => {
    const { currentUser, setCurrentUser, users, setUsers } = props;
    const [usernameInput, setUsernameInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    
    const register = useCallback((username: string, password: string) => {
        console.log(users)
        console.log(users.map((user) => user.username));
        if(!(users.map((user) => user.username).includes(username)) && (username != "")){
            const newUser: User = {
                username: username,
                password: password,
                friends: [],
                matches: [],
            }
            setUsers((prev: User[]) => [...prev, newUser]);
            // another common baseline function that the linter doesn't recognize
            // eslint-disable-next-line no-undef
            alert("Registered Successfully.");
        } else {
            // another common baseline function that the linter doesn't recognize
            // eslint-disable-next-line no-undef
            alert("Invalid Username.");
        }
    }, [users]);

    const login = useCallback((username: string, password: string) => {
        if((users.map((user) => user.username).includes(username))){
            const attemptedUser = users.filter((user) => user.username == username)[0]
            if(username == attemptedUser.username && password == attemptedUser.password){
                setCurrentUser(attemptedUser);
            } else {
                // another common baseline function that the linter doesn't recognize
                // eslint-disable-next-line no-undef
                alert("Incorrect password.");
            }

        } else {
            // another common baseline function that the linter doesn't recognize
            // eslint-disable-next-line no-undef
            alert("User not found.");
        }
    }, [users]);

    const logout = useCallback(() => {
        setCurrentUser(null);
        setUsernameInput("");
        setPasswordInput("");
    }, []);
    
    return (
        <div className='h-full flex flex-col max-w-1/3'>
            <div className="h-screen flex flex-col p-4 mr-auto shadow-[4px_0_20px_grey]">
                <div className="mr-auto">
                    <h1 className="text-4xl font-black">Tennis Match Tracker</h1>
                    <div className="items-center text-md">
                        <h2>Created by Khang Nguyen - ktnguyen@udel.edu</h2>
                        <h2>
                            <a className="text-blue-600 underline" target="_blank" href="https://github.com/Flair74/181final">Repository Link</a> | 
                            <a className="text-blue-600 underline" target="_blank" href="https://github.com/Flair74/181final/blob/master/docs/progress.md"> Progress Doc</a>
                        </h2>
                    </div>
                </div>
                <hr className='my-2'></hr>
                <div className="flex flex-col">
                    <div className={`mb-2 flex flex-row gap-2 ${currentUser == null ? "h-0 overflow-hidden" : ""}`}>
                        <h2 className="mt-1">Current User: {currentUser ? currentUser.username : "not logged in"}</h2>
                        <button className={`border-2 border-black px-2 mt-1 ml-auto ${currentUser !== null ? "visible" : "invisible"}`} onClick={() => {logout()}}>Log Out</button>
                    </div>
                    <div className={`flex flex-row gap-2 ${currentUser !== null ? "h-0 overflow-hidden" : ""}`}>
                        <div className="flex flex-col gap-2 w-full">
                            <input className="border-2 border-black px-2 w-full" type="text" placeholder="Username" value={usernameInput} onChange={e => {setUsernameInput(e.target.value)}}/>
                            <input className="border-2 border-black px-2 w-full" type="text" placeholder="Password" value={passwordInput} onChange={e => {setPasswordInput(e.target.value)}}/>
                        </div>
                        <div className="flex flex-col gap-2 mb-2 ml-auto"> 
                            <button className="border-2 border-black w-full px-2 ml-auto" onClick={() => {register(usernameInput, passwordInput)}}>Register</button>
                            <button className="border-2 border-black w-full px-2 ml-auto" onClick={() => {login(usernameInput, passwordInput)}}>Login</button>
                        </div>
                    </div>
                </div>
                <hr className='my-2'></hr>
            </div>
        </div>
        
    )
}

export default Sidebar;
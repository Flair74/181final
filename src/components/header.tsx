import React, { useCallback, useState } from 'react';
import '../App.css';
import { User } from './interfaces';

//will make a props thing eventually
function Header({currentUser, setCurrentUser, users, setUsers}: {currentUser: User | null, setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>, users: User[], setUsers: React.Dispatch<React.SetStateAction<User[]>>}) {
    const [usernameInput, setUsernameInput] = useState<string>("username");
    const [passwordInput, setPasswordInput] = useState<string>("password");
    
    const register = useCallback((username: string, password: string) => {
        console.log(users)
        console.log(users.map((user) => user.username));
        if(!(users.map((user) => user.username).includes(username))){
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
            alert("Duplicate Username.");
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
        setUsernameInput("username");
        setPasswordInput("password");
    }, []);
    
    return (
        <div className='w-full flex flex-row'>
            <div className="flex flex-row p-4 w-full shadow-xl">
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
                <div className="flex flex-col">
                    <div className="ml-auto flex flex-row gap-2">
                        <div className="flex flex-col gap-2">
                            <h2 className="mb-1">Current User: {currentUser ? currentUser.username : "not logged in"}</h2>
                            <input className="border-2 border-black px-2" type="text" placeholder="Username" value={usernameInput} onChange={e => {setUsernameInput(e.target.value)}}/>
                            <input className="border-2 border-black px-2" type="text" placeholder="Password" value={passwordInput} onChange={e => {setPasswordInput(e.target.value)}}/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className={`border-2 border-black px-2 ${currentUser !== null ? "visible" : "invisible"}`} onClick={() => {logout()}}>Log Out</button>
                            <button className="border-2 border-black w-full px-2" onClick={() => {register(usernameInput, passwordInput)}}>Register</button>
                            <button className="border-2 border-black w-full px-2" onClick={() => {login(usernameInput, passwordInput)}}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Header;
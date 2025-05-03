import React, { useCallback, useState } from 'react';
import '../App.css';
import { User } from './interfaces';

interface SidebarProps {
    currentUser: User | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    mode: string;
    setMode: React.Dispatch<React.SetStateAction<string>>;
  }

  const Sidebar: React.FC<SidebarProps> = (props) => {
    const { currentUser, setCurrentUser, users, setUsers, mode, setMode } = props;
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
    
    const classMap: { [key: string]: {[key: string]: string}} = {
        match: {
            color: "text-[#84cc16]",
            border: "border-lime-500",
            shadow: "shadow-[4px_0_20px_#84cc16]",
        },
        practice: {
            color: "text-[#FAA916]",
            border: "border-[#FAA916]",
            shadow: "shadow-[4px_0_20px_#FAA916]",
        },
        friends: {
            color: "text-[#F92A82]",
            border: "border-[#F92A82]",
            shadow: "shadow-[4px_0_20px_#F92A82]",
        },
        profile: {
            color: "text-[#75B9BE]",
            border: "border-[#75B9BE]",
            shadow: "shadow-[4px_0_20px_#75B9BE]",
        },
      };
      
      const { color, border, shadow } = classMap[mode];
      
      return (
        <div className="h-full flex flex-col max-w-1/3">
            <div className={`h-screen flex flex-col p-4 mr-auto border-r-4 ${border} ${shadow}`}>
                <div className="mr-auto">
                    <h1 className={`mx-auto text-4xl ${color} font-bold`}>Tennis Match Tracker</h1>
                    <div className="mx-auto text-center items-center text-md">
                        <h2>Created by Khang Nguyen - ktnguyen@udel.edu</h2>
                        <h2>
                            <a className="text-blue-600 underline" target="_blank" href="https://github.com/Flair74/181final">Repository Link</a> | 
                            <a className="text-blue-600 underline" target="_blank" href="https://github.com/Flair74/181final/blob/master/docs/progress.md"> Progress Doc</a>
                        </h2>
                    </div>
                </div>
                <hr className='my-2'></hr>
                <div className='flex flex-col gap-2'>
                    {
                    //<button className="overflow-hidden flex flex-row items-center w-full pr-2 min-h-16 text-3xl">
                        //<div className="w-1 shadow-[0px_0_20px_rgba(14,165,233,1)] h-full bg-sky-500 mr-4"/>
                        //<h1 className='font-semibold text-3xl'>Matches</h1>
                    //</button>
                    }
                    <button 
                        className="border-2 border-black w-full px-2 min-h-16 text-3xl"
                        onClick={() => {setMode("match")}}
                    >
                            Matches
                    </button>
                    <button 
                        className="border-2 border-black w-full px-2 min-h-16 text-3xl"
                        onClick={() => {setMode("practice")}}
                    >
                            Practices
                    </button>
                    <button 
                        className="border-2 border-black w-full px-2 min-h-16 text-3xl"
                        onClick={() => {setMode("friends")}}
                    >
                            Friends
                    </button>
                    <button 
                        className="border-2 border-black w-full px-2 min-h-16 text-3xl"
                        onClick={() => {setMode("profile")}}
                    >
                            Profile
                    </button>
                </div>
                <div className='mt-auto'>
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
                </div>
            </div>
        </div>
        
    )
}

export default Sidebar;
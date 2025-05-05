import React, { useCallback, useState } from 'react';
import '../App.css';
import { User } from './interfaces';

interface SidebarProps {
    currentUser: User | null;
    setCurrentUsername: React.Dispatch<React.SetStateAction<string | null>>;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    mode: string;
    setMode: React.Dispatch<React.SetStateAction<string>>;
}

  const Sidebar: React.FC<SidebarProps> = (props) => {
    const { currentUser, setCurrentUsername, users, setUsers, mode, setMode } = props;
    const [usernameInput, setUsernameInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    
    const register = useCallback((username: string, password: string) => {
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
    }, [users, setUsers]);

    const login = useCallback((username: string, password: string) => {
        const user = users.find(user => user.username === username);
        if (user && user.password === password) {
            setCurrentUsername(username);
        } else {
            // L linter
            // eslint-disable-next-line no-undef
            alert("Incorrect username or password.");
        }
      }, [users, setCurrentUsername]);

    const logout = useCallback(() => {
        setCurrentUsername(null);
        setUsernameInput("");
        setPasswordInput("");
    }, []);
    
    const classMap: { [key: string]: {[key: string]: string}} = {
        match: {
            color: "text-[#3E82FC]",
            border: "border-[#3E82FC]",
            shadow: "shadow-[0px_4px_0px_#3E82FC]",
        },
        practice: {
            color: "text-[#FAA916]",
            border: "border-[#FAA916]",
            shadow: "shadow-[0px_4px_0px_#FAA916]",
        },
        friends: {
            color: "text-[#F92A82]",
            border: "border-[#F92A82]",
            shadow: "shadow-[0px_4px_0px_#F92A82]",
        },
        profile: {
            color: "text-[#A45EE5]",
            border: "border-[#A45EE5]",
            shadow: "shadow-[0px_4px_0px_#A45EE5]",
        },
      };
      
      const { color, border, shadow } = classMap[mode];
      
      return (
        <div className="h-full flex flex-col max-w-1/3">
            <div className={`h-screen my-4 rounded-r-3xl flex flex-col p-4 mr-auto border-r-4 border-y-4 ${border} ${shadow}`}>
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
                        className={`w-full px-2 min-h-16 text-3xl ${mode=="match" ? "font-semibold" : ""}`}
                        onClick={() => {setMode("match")}}
                    >
                            <p className={`inline text-${mode=="match" ? "[#3E82FC]" : "gray-400"} text-3xl`}>{'• '}</p>Matches
                    </button>
                    <button 
                        className={`w-full px-2 min-h-16 text-3xl ${mode=="practice" ? "font-semibold" : ""}`}
                        onClick={() => {setMode("practice")}}
                    >
                            <p className={`inline text-${mode=="practice" ? "[#FAA916]" : "gray-400"} text-3xl`}>{'• '}</p>Practices
                    </button>
                    <button 
                        className={`w-full px-2 min-h-16 text-3xl ${mode=="friends" ? "font-semibold" : ""}`}
                        onClick={() => {setMode("friends")}}
                    >
                            <p className={`inline text-${mode=="friends" ? "[#F92A82]" : "gray-400"} text-3xl`}>{'• '}</p>Friends
                    </button>
                    <button 
                        className={`w-full px-2 min-h-16 text-3xl ${mode=="profile" ? "font-semibold" : ""}`}
                        onClick={() => {setMode("profile")}}
                    >
                            <p className={`inline text-${mode=="profile" ? "[#A45EE5]" : "gray-400"} text-3xl`}>{'• '}</p>Profile
                    </button>
                </div>
                <div className='mt-auto'>
                    <hr className='my-2'></hr>
                    <div className="flex flex-col">
                        <div className={`mb-2 flex flex-row gap-2 ${currentUser == null ? "h-0 overflow-hidden" : ""}`}>
                            <h2 className="mt-1">Current User: {currentUser ? currentUser.username : "not logged in"}</h2>
                            <button className={`underline decoration-[#3E82FC] underline-offset-2 decoration-2 px-2 mt-1 ml-auto ${currentUser !== null ? "visible" : "invisible"}`} onClick={() => {logout()}}>Log Out</button>
                        </div>
                        <div className={`flex flex-row gap-2 ${currentUser !== null ? "h-0 overflow-hidden" : ""}`}>
                            <div className="flex flex-col gap-2 w-full">
                                <input className="px-2 w-full bg-gray-800" type="text" placeholder="Username" value={usernameInput} onChange={e => {setUsernameInput(e.target.value)}}/>
                                <input className="px-2 w-full bg-gray-800" type="password" placeholder="Password" value={passwordInput} onChange={e => {setPasswordInput(e.target.value)}}/>
                            </div>
                            <div className="flex flex-col gap-2 ml-auto"> 
                                <button className="w-full px-2 ml-auto underline decoration-[#3E82FC] underline-offset-2 decoration-2" onClick={() => {register(usernameInput, passwordInput)}}>Register</button>
                                <button className="w-full px-2 ml-auto underline decoration-[#3E82FC] underline-offset-2 decoration-2" onClick={() => {login(usernameInput, passwordInput)}}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Sidebar;
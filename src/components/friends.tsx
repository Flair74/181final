import React, { useCallback, useState } from "react";
import "../App.css"
import { User } from "./interfaces"

interface FriendsProps {
    currentUser: User | null;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const Friends: React.FC<FriendsProps> = (props) => {
    const { currentUser, users, setUsers } = props;
    const [addingFriend, setAddingFriend] = useState<boolean>(false);
    const [tempUsername, setTempUsername] = useState<string>("");

    const addFriend = useCallback(() => {
        if(!currentUser) return;
        setAddingFriend(true);
    }, [currentUser, setUsers])

    const saveFriend = useCallback(() => {
        if(!currentUser || !addingFriend) return;
        if(users.map((user) => user.username).includes(tempUsername)){
            const updatedUser = {
                ...currentUser,
                friends: [...currentUser.friends, tempUsername]
            };

            setUsers(prev =>
                prev.map(user =>
                    user.username === currentUser.username ? updatedUser : user
                )
            );

            setTempUsername("");
            setAddingFriend(false);
        } else {
            // eslint-disable-next-line no-undef
            alert("Invalid friend username.")
            setTempUsername("");
        }
    }, [currentUser, addingFriend, setAddingFriend, tempUsername, setTempUsername, setUsers])

    const removeFriend = useCallback((name: string) => {
            if (!currentUser) return;
            const updatedUser = {
                ...currentUser,
                friends: currentUser.friends.filter((friend) => friend !== name),
            };
    
            setUsers(prev =>
                prev.map(user =>
                    user.username === currentUser.username ? updatedUser : user
                )
            );
        }, [currentUser, setUsers]);

    return (
        <div className="w-full flex flex-col items-center">            
            <div className="border-4 border-[#F92A82] shadow-[0px_4px_0px_#F92A82] rounded-full w-1/2 flex flex-row p-2 pl-4 pr-2 my-4 h-16 items-center">
                <h1 className="text-3xl font-semibold"> <p className="inline text-[#F92A82]">{'• '}</p>Friends</h1>
                {(currentUser == null || currentUser.friends.length == 0) && (
                    <div className="ml-auto mr-4 justify-center">
                        <h2 className="text-lg italic text-gray-400">No friends to display...</h2>
                    </div>
                )}
                {currentUser !== null && (
                    <div className="ml-auto flex flex-row gap-2 justify-center mr-2">
                        <button className="p-1 px-2" onClick={() => { addFriend(); }}>
                            <p className="underline decoration-[#F92A82] underline-offset-2 decoration-2">+ Add</p>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Friends;
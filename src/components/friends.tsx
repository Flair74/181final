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
        if(users.map((user) => user.username).includes(tempUsername) && tempUsername != currentUser.username){
            const updatedUser = {
                ...currentUser,
                friends: [...currentUser.friends, tempUsername]
            };
            const friend = users.find((user) => user.username == tempUsername)
            const updatedFriend = {
                ...friend!,
                friends: [...friend!.friends, currentUser.username]
            }

            setUsers(prev =>
                prev.map(user =>
                    user.username === currentUser.username ? updatedUser : user
                )
            );

            setUsers(prev =>
                prev.map(user =>
                    user.username === tempUsername ? updatedFriend : user
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
            const friend = users.find((user) => user.username == name)
            const updatedFriend = {
                ...friend!,
                friends: friend!.friends.filter((friend) => friend != currentUser.username)
            }
    
            setUsers(prev =>
                prev.map(user =>
                    user.username === currentUser.username ? updatedUser : user
                )
            );

            setUsers(prev =>
                prev.map(user =>
                    user.username === name ? updatedFriend : user
                )
            );
        }, [currentUser, setUsers]);

    return (
        <div className="w-full flex flex-col items-center">
            {addingFriend && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3 max-h-[80vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4">Add Friend</h2>
                    <div className="mb-4">
                            <label className="block text-gray-300 mb-2">Username</label>
                            <input
                                type="text"
                                className="w-full p-2 border bg-gray-700 rounded"
                                value={tempUsername}
                                onChange={(e) => { setTempUsername(e.target.value); }}
                            />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button 
                            className="px-4 py-2 bg-gray-700 rounded"
                            onClick={() => { setAddingFriend(false); setTempUsername(""); }}
                        >
                            Cancel
                        </button>
                        <button 
                            className="px-4 py-2 bg-[#3E82FC] text-white rounded"
                            onClick={() => { saveFriend(); }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>)}

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

            <div className="w-2/3 space-y-4 mb-4 overflow-auto h-full scrollbar pr-2">
                {currentUser?.friends.map((friend) => (
                    <div key={`friend-${friend}`} className={`border-2 border-[#F92A82] shadow-[0px_4px_0px_#F92A82] rounded-2xl p-4`}>
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">
                                {friend}
                            </h3>
                            <span className="text-gray-200 text-sm">
                                <button className="p-1 px-2" onClick={() => { removeFriend(friend); }}>
                                    <p className={`underline decoration-[#F92A82] underline-offset-2 decoration-2`}>Remove</p>
                                </button>
                            </span>
                        </div>
                        <div className="flex flex-row gap-16">
                            <div>
                                <h4 className="text-medium">Recent Matches:</h4>
                                {/*stunning line of code here*/}
                                {users.find((user) => user.username == friend)?.matches.slice(0, Math.min(users.find((user) => user.username == friend)!.matches.length, 3)).map((match) => 
                                    <div >
                                        <p>
                                            {typeof match.opponent === 'object' ? 
                                            match.opponent.username : 
                                            match.opponent + ", " + 
                                            new Date(match.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="text-medium">Statistics:</h4>
                                <p>Matches played: {users.find((user) => user.username == friend)?.matches.length}</p>
                                <p>Matches won: {users.find((user) => user.username == friend)?.matches.filter((match) => match.score.filter((set) => set.win).length > match.score.filter((set) => !set.win).length).length}</p>
                                <p>Friends: {users.find((user) => user.username == friend)?.friends.length}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Friends;
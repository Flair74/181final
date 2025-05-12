import React, { useCallback, useState } from "react";
import "../App.css"
import { User, Practice } from "./interfaces"

interface PracticesProps {
    currentUser: User | null;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const Practices: React.FC<PracticesProps> = (props) => {
    const { currentUser, users, setUsers } = props;
    const [editingPrac, setEditingPrac] = useState<Practice | null>(null);
    const [tempDate, setTempDate] = useState<string>("");
    const [tempDesc, setTempDesc] = useState<string>("");
    const [tempRating, setTempRating] = useState<number>(5);
    users;
    //add a default practice 
    const addPractice = useCallback(() => {
        if (!currentUser) return;
        const newPrac: Practice = {
            id: Date.now().toString(),
            date: new Date().toDateString(),
            description: "A tennis practice",
            rating: 5
        };
    
        const updatedUser = {
            ...currentUser,
            practices: [...currentUser.practices, newPrac],
        };
    
        setUsers(prev =>
            prev.map(user =>
            user.username === currentUser.username ? updatedUser : user
            )
        );
    }, [currentUser, setUsers]);

    //delete practice
    const deletePractice = useCallback((id: string) => {
        if (!currentUser) return;
        const updatedUser = {
            ...currentUser,
            practices: currentUser.practices.filter((match) => match.id !== id),
        };

        setUsers(prev =>
            prev.map(user =>
                user.username === currentUser.username ? updatedUser : user
            )
        );
    }, [currentUser, setUsers]);

    //open edit practice modal
    const editPractice = useCallback((practice: Practice) => {
            setEditingPrac(practice);
            setTempDate(practice.date);
            setTempDesc(practice.description);
            setTempRating(practice.rating);
    }, [setEditingPrac, setTempDate, setTempDesc, setTempRating]);

    //save practice from edit modal
    const savePractice = useCallback(() => {
        if (!currentUser || !editingPrac) return;
        
        const updatedPrac = {
            ...editingPrac,
            date: tempDate,
            description: tempDesc,
            rating: tempRating,
        };

        const updatedUser = {
            ...currentUser,
            practices: currentUser.practices.map(practice => 
                practice.id === editingPrac.id ? updatedPrac : practice
            )
        };

        setUsers(prev =>
            prev.map(user =>
                user.username === currentUser.username ? updatedUser : user
            )
        );

        setEditingPrac(null);
    }, [currentUser, editingPrac, tempDate, tempDesc, tempRating, setUsers]);

    return (
        <div className="w-full flex flex-col items-center">
        {editingPrac && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3 max-h-[80vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4">Edit Practice</h2>
                    <div className="mb-4">
                            <label className="block text-gray-300 mb-2">Date</label>
                            <input
                                type="date"
                                className="w-full p-2 border bg-gray-700 rounded"
                                value={tempDate}
                                onChange={(e) => { setTempDate(e.target.value); }}
                            />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Rating</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            className="w-16 p-1 bg-gray-700 border border-gray-300 rounded"
                            value={`${tempRating}`}
                            onChange={(e) => {
                                setTempRating(parseInt(e.target.value) || 0);
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Description</label>
                        <textarea
                            placeholder="Description"
                            rows={5}
                            className="w-full p-1 bg-gray-700 border border-gray-300 rounded"
                            value={`${tempDesc}`}
                            onChange={(e) => {
                                setTempDesc(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button 
                            className="px-4 py-2 bg-gray-700 rounded"
                            onClick={() => { setEditingPrac(null); }}
                        >
                            Cancel
                        </button>
                        <button 
                            className="px-4 py-2 bg-[#3E82FC] text-white rounded"
                            onClick={() => { savePractice(); }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>)}
            <div className="border-4 border-[#FAA916] shadow-[0px_4px_0px_#FAA916] rounded-full w-1/2 flex flex-row p-2 pl-4 pr-2 my-4 h-16 items-center">
                <h1 className="text-3xl font-semibold"> <p className="inline text-[#FAA916]">{'• '}</p>Practices</h1>
                {(currentUser == null || currentUser.practices.length == 0) && (
                    <div className="ml-auto mr-4 justify-center">
                        <h2 className="text-lg italic text-gray-400">No practices to display...</h2>
                    </div>
                )}
                {currentUser !== null && (
                    <div className="ml-auto flex flex-row gap-2 justify-center mr-2">
                        <button className="p-1 px-2" onClick={() => { addPractice(); }}>
                            <p className="underline decoration-[#FAA916] underline-offset-2 decoration-2">+ New</p>
                        </button>
                    </div>
                )}
            </div>

            <div className="w-2/3 space-y-4 mb-4 overflow-auto h-full scrollbar pr-2">
                {currentUser?.practices.map((practice) => (
                    <div key={`practice-${practice.id}`} className={`border-2 border-[#FAA916] shadow-[0px_4px_0px_#FAA916] rounded-2xl p-4`}>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xl font-semibold">
                                Practice •
                                    <p className="font-sans inline">{" " + ("★".repeat(practice.rating)) + ("☆".repeat(5-practice.rating))}</p>
                                    {" • " + new Date(practice.date).toLocaleDateString()}
                            </h3>
                            <span className="text-gray-200 text-sm">
                                <button className="p-1 px-2" onClick={() => { editPractice(practice); }}>
                                    <p className={`underline decoration-[#FAA916] underline-offset-2 decoration-2`}>Edit</p>
                                </button>
                                <button className="p-1 px-2" onClick={() => { deletePractice(practice.id); }}>
                                    <p className={`underline decoration-[#FAA916] underline-offset-2 decoration-2`}>Remove</p>
                                </button>
                            </span>
                        </div>
                        <div>
                            <p>{practice.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Practices;
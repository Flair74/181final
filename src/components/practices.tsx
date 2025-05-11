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
    const [tempDate, setTempDate] = useState("");
    const [tempDesc, setTempDesc] = useState("");
    users;
    const addPractice = useCallback(() => {
        if (!currentUser) return;
        const newPrac: Practice = {
            id: Date.now().toString(),
            date: new Date().toDateString(),
            description: "A tennis practice"
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

    const editPractice = useCallback((practice: Practice) => {
            setEditingPrac(practice);
            setTempDate(practice.date);
            setTempDesc(practice.description);
    }, []);

    const saveMatch = useCallback(() => {
        if (!currentUser || !editingPrac) return;
        
        const updatedPrac = {
            ...editingPrac,
            date: tempDate,
            desc: tempDesc
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
    }, [currentUser, editingPrac, tempDate, tempDesc, setUsers]);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="border-4 border-[#3E82FC] shadow-[0px_4px_0px_#3E82FC] rounded-full w-1/2 flex flex-row p-2 pl-4 pr-2 my-4 h-16 items-center">
                <h1 className="text-3xl font-semibold"> <p className="inline text-[#3E82FC]">{'• '}</p>Practices</h1>
                {(currentUser == null || currentUser.practices.length == 0) && (
                    <div className="ml-auto mr-4 justify-center">
                        <h2 className="text-lg italic text-gray-400">No practices to display...</h2>
                    </div>
                )}
                {currentUser !== null && (
                    <div className="ml-auto flex flex-row gap-2 justify-center mr-2">
                        <button className="p-1 px-2" onClick={() => { addPractice(); }}>
                            <p className="underline decoration-[#3E82FC] underline-offset-2 decoration-2">+ New</p>
                        </button>
                    </div>
                )}
            </div>

            <div className="w-2/3 space-y-4 mb-4 overflow-auto h-full scrollbar pr-2">
                {currentUser?.practices.map((practice) => (
                    <div key={`match-${practice.id}`} className={`border-2 border-[#84cc16] shadow-[0px_4px_0px_#84cc16] rounded-2xl p-4`}>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xl font-semibold">
                                Practice
                                    {" • " + new Date(practice.date).toLocaleDateString()}
                            </h3>
                            <span className="text-gray-200 text-sm">
                                <button className="p-1 px-2" onClick={() => { editPractice(practice); }}>
                                    <p className={`underline decoration-[#84cc16] underline-offset-2 decoration-2`}>Edit</p>
                                </button>
                                <button className="p-1 px-2" onClick={() => { deletePractice(practice.id); }}>
                                    <p className={`underline decoration-[#84cc16] underline-offset-2 decoration-2`}>Remove</p>
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
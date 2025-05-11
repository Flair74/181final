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
    return (
        <div className="place-self-center">Current mode: practices Current user: {currentUser ? currentUser.username : "null"}</div>
    )
}

export default Practices;
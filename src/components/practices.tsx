import React from "react";
import "../App.css"
import { User } from "./interfaces"

interface PracticesProps {
    currentUser: User | null;
}

const Practices: React.FC<PracticesProps> = (props) => {
    const { currentUser } = props;
    return (
        <div className="place-self-center">Current mode: practices Current user: {currentUser ? currentUser.username : "null"}</div>
    )
}

export default Practices;
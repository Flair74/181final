import React from "react";
import "../App.css"
import { User } from "./interfaces"

interface MatchesProps {
    currentUser: User | null;
}

const Matches: React.FC<MatchesProps> = (props) => {
    const { currentUser } = props;
    return (
        <div className="place-self-center">Current mode: matches Current user: {currentUser ? currentUser.username : "null"}</div>
    )
}

export default Matches;
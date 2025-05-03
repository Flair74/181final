import React from "react";
import "../App.css"
import { User } from "./interfaces"

interface FriendsProps {
    currentUser: User | null;
}

const Friends: React.FC<FriendsProps> = (props) => {
    const { currentUser } = props;
    return (
        <div className="place-self-center">Current mode: friends Current user: {currentUser ? currentUser.username : "null"}</div>
    )
}

export default Friends;
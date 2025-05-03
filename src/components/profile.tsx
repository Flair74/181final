import React from "react";
import "../App.css"
import { User } from "./interfaces"

interface ProfileProps {
    currentUser: User | null;
}

const Profile: React.FC<ProfileProps> = (props) => {
    const { currentUser } = props;
    return (
        <div className="place-self-center">Current mode: profile Current user: {currentUser ? currentUser.username : "null"}</div>
    )
}

export default Profile;
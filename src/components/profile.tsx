import React from "react";
import "../App.css"
import { User } from "./interfaces"

interface ProfileProps {
    currentUser: User | null;
}

const Profile: React.FC<ProfileProps> = (props) => {
    const { currentUser } = props;
    currentUser;
    return (
        <div className="w-full flex flex-col items-center">

        </div>
    )
}

export default Profile;
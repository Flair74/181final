
import React from 'react';
import '../App.css';
import { User } from './interfaces';
import Matches from './matches';
import Practices from './practices';
import Friends from './friends';
import Profile from './profile';

interface ContentProps {
    currentUser: User | null;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    mode: string;
    setMode: React.Dispatch<React.SetStateAction<string>>;
}

const Content: React.FC<ContentProps> = (props) => {
    const { currentUser, users, setUsers, mode} = props;
    return (
        <div className='flex flex-1 h-screen justify-center'>
            {mode === "match" && (
                <Matches
                    currentUser={currentUser}
                    users={users}
                    setUsers={setUsers}
                />
            )}
            {mode === "practice" && (
                <Practices
                    currentUser={currentUser}
                />
            )}
            {mode === "friends" && (
                <Friends
                    currentUser={currentUser}
                />
            )}
            {mode === "profile" && (
                <Profile
                    currentUser={currentUser}
                />
            )}
        </div>
    )
}

export default Content;
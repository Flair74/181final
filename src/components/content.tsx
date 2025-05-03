
import React from 'react';
import '../App.css';
import { User } from './interfaces';
import Matches from './matches';
import Practices from './practices';
import Friends from './friends';
import Profile from './profile';

interface ContentProps {
    currentUser: User | null;
    mode: string;
    setMode: React.Dispatch<React.SetStateAction<string>>;
}

const Content: React.FC<ContentProps> = (props) => {
    const { currentUser, mode, setMode } = props;
    currentUser;
    setMode;
    return (
        <div className='flex flex-1 h-screen justify-center'>
            {mode === "match" && (
                <Matches
                    currentUser={currentUser}
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
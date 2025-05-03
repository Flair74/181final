
import React from 'react';
import '../App.css';
import { User } from './interfaces';

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
                <h1 className='place-self-center'>no matches to display :(</h1>
            )}
        </div>
    )
}

export default Content;
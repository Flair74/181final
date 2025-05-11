import React from "react";
import "../App.css"
import { User } from "./interfaces"

interface ProfileProps {
    currentUser: User | null;
}

const Profile: React.FC<ProfileProps> = (props) => {
    const { currentUser } = props;
    const wins  = currentUser?.matches.filter((match) => match.score.filter((set) => set.win).length > match.score.filter((set) => !set.win).length).length;
    const setsPlayed = currentUser?.matches.reduce((acc, cv) => acc + cv.score.length, 0);
    const setsWon = currentUser?.matches.reduce((acc, cv) => acc + cv.score.filter((set) => set.win).length, 0);
    const gamesPlayed = currentUser?.matches.reduce((acc, cv) => acc+cv.score.reduce((acc, cv) => acc + cv.score1 + cv.score2, 0), 0);
    const gamesWon =                             currentUser?.matches.reduce((acc, cv) => acc+cv.score.reduce((acc, cv) => acc + cv.score1, 0), 0);
    return (
        <div className="w-full flex flex-col items-center">
            <div className="border-4 border-[#A45EE5] shadow-[0px_4px_0px_#A45EE5] rounded-full w-1/2 flex flex-row p-2 pl-4 pr-2 my-4 h-16 items-center">
                <h1 className="text-3xl font-semibold"> <p className="inline text-[#A45EE5]">{'• '}</p>Profile - {currentUser?.username}</h1>
            </div>
            <div className="border-4 border-[#A45EE5] shadow-[0px_4px_0px_#A45EE5] rounded-3xl w-2/3 flex flex-row p-4 px-6 my-4 h-2/3">
                <div className="w-full">
                    <h3 className="text-xl font-bold">Match Statistics</h3>
                    <hr className="my-1"/>
                    <div className="flex flex-row w-full justify-between gap-4">
                        <div className="w-full">
                            <h3 className="font-bold">Matches</h3>
                            <div className="flex flex-row w-full">
                                <div>
                                    <p>Matches played:</p>
                                    <p>Matches won:</p>
                                    <p>Match win %:</p>
                                </div>
                                <div className="ml-auto text-right">
                                    <p>{currentUser?.matches.length}</p>
                                    <p>{wins}</p>
                                    <p>{(wins && currentUser.matches.length>0 ? (wins/currentUser.matches.length*100).toFixed(2) : 0)}%</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <h3 className="font-bold">Sets</h3>
                            <div className="flex flex-row w-full">
                                <div>
                                    <p>Sets played:</p>
                                    <p>Sets won:</p>
                                    <p>Sets win %:</p>
                                </div>
                                <div className="ml-auto text-right">
                                    <p>{setsPlayed}</p>
                                    <p>{setsWon}</p>
                                    <p>{(setsWon && setsPlayed ? (setsWon/setsPlayed*100).toFixed(2) : 0)}%</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <h3 className="font-bold">Games</h3>
                            <div className="flex flex-row w-full">
                                <div>
                                    <p>Games played:</p>
                                    <p>Games won:</p>
                                    <p>Games win %:</p>
                                </div>
                                <div className="ml-auto text-right">
                                    <p>{gamesPlayed}</p>
                                    <p>{gamesWon}</p>
                                    <p>{(gamesWon && gamesPlayed ? (gamesWon/gamesPlayed*100).toFixed(2) : 0)}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
import React, { useCallback } from "react";
import "../App.css"
import { User } from "./interfaces"
import { Match } from "./interfaces";

interface MatchesProps {
    currentUser: User | null;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  }

  const Matches: React.FC<MatchesProps> = (props) => {
    const { currentUser, users, setUsers } = props;
    users;
    const addMatch = useCallback(() => {
        if (!currentUser) return;
    
        const newMatch: Match = {
          id: Date.now().toString(),
          opponent: "Unknown Opponent",
          score: [],
          date: new Date().toDateString(),
        };
    
        const updatedUser = {
          ...currentUser,
          matches: [...currentUser.matches, newMatch],
        };
    
        setUsers(prev =>
          prev.map(user =>
            user.username === currentUser.username ? updatedUser : user
          )
        );
      }, [currentUser, setUsers]);
    
      const deleteMatch = useCallback((id: string) => {
        if (!currentUser) return;
        const updatedUser = {
            ...currentUser,
            matches: currentUser.matches.filter((match) => match.id != id),
        };

        setUsers(prev =>
            prev.map(user =>
                user.username === currentUser.username ? updatedUser : user
            )
        );
      }, [currentUser, setUsers, users])

    return (
        <div className="w-full flex flex-col items-center">
            <div className="border-4 border-[#84cc16] shadow-[0px_4px_0px_#84cc16] rounded-full w-1/2 flex flex-row p-2 pl-4 pr-2 my-4 h-16 items-center">
                <h1 className="text-3xl font-semibold"> <p className="inline text-[#84cc16]">{'• '}</p>Matches</h1>
                {(currentUser == null || currentUser.matches.length == 0) && (
                    <div className="ml-auto mr-4 justify-center">
                        <h2 className="text-lg italic text-gray-400">No matches to display...</h2>
                    </div>
                )}
                {currentUser !== null && (
                    <div className="ml-auto flex flex-row gap-2 justify-center mr-2">
                        <button className="p-1 px-2" onClick={() => {addMatch()}}>
                            <p className="underline decoration-[#84cc16] underline-offset-2 decoration-2">+ New</p>
                        </button>
                    </div>
                )}
            </div>
                <div className="w-3/4 space-y-4 overflow-auto h-full">
                    {currentUser?.matches.map((match) => (
                        <div key={`match-${match.id}`} className="border-2 border-[#84cc16] shadow-[0px_4px_0px_#84cc16] rounded-2xl p-4">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-xl font-semibold">
                                    {typeof match.opponent === 'object' ? 
                                        match.opponent.username : 
                                        match.opponent} • {
                                            match.score.length > 0 ?
                                            (match.score.filter((set) => set.win).length > match.score.filter((set) => !set.win).length) ? 
                                            <p className="inline text-[#3E82FC]">Win</p>
                                            : 
                                            <p className="inline text-[#FF746C]">Loss</p>
                                            :
                                            <p className="inline text-black">No Score</p>
                                        }
                                        {" • " + new Date(match.date).toLocaleDateString()}
                                </h3>
                                <span className="text-gray-500 text-sm">
                                    <button className="p-1 px-2">
                                        <p className="underline decoration-[#84cc16] underline-offset-2 decoration-2">Edit</p>
                                    </button>
                                    <button className="p-1 px-2">
                                        <p className="underline decoration-[#84cc16] underline-offset-2 decoration-2" onClick={() => {deleteMatch(match.id)}}>Remove</p>
                                    </button>
                                </span>
                            </div>
                            
                            {match.score.length > 0 ? (
                                <div className="space-y-3">
                                    {match.score.map((set, setIndex) => (
                                        <div key={setIndex} className="border border-gray-100 rounded p-2">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-medium">Set {setIndex + 1}</span>
                                                <span className="text-sm">
                                                    {set.games.filter(g => g).length} - {set.games.filter(g => !g).length}
                                                </span>
                                            </div>
                                            <div className="flex gap-1">
                                                {set.games.map((won, gameIndex) => (
                                                    <div 
                                                        key={gameIndex}
                                                        className={`w-4 h-4 rounded-full ${won ? 'bg-[#84cc16]' : 'bg-gray-300'}`}
                                                        title={`Game ${gameIndex + 1}: ${won ? 'Won' : 'Lost'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 italic">No score recorded</p>
                            )}
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default Matches;
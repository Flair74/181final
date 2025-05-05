import React, { useCallback, useState } from "react";
import "../App.css"
import { User, Match, Set } from "./interfaces";

interface MatchesProps {
    currentUser: User | null;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const Matches: React.FC<MatchesProps> = (props) => {
    const { currentUser, users, setUsers } = props;
    const [editingMatch, setEditingMatch] = useState<Match | null>(null);
    const [tempOpponent, setTempOpponent] = useState("");
    const [tempDate, setTempDate] = useState("");
    const [tempSets, setTempSets] = useState<Set[]>([]);
    const [newSetSimple, setNewSetSimple] = useState(true);
    const [newSetScore1, setNewSetScore1] = useState(0);
    const [newSetScore2, setNewSetScore2] = useState(0);
    const [newGameWon, setNewGameWon] = useState(true);
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
            matches: currentUser.matches.filter((match) => match.id !== id),
        };

        setUsers(prev =>
            prev.map(user =>
                user.username === currentUser.username ? updatedUser : user
            )
        );
    }, [currentUser, setUsers]);

    const editMatch = useCallback((match: Match) => {
        setEditingMatch(match);
        setTempOpponent(typeof match.opponent === 'object' ? match.opponent.username : match.opponent);
        setTempDate(match.date);
        setTempSets([...match.score]);
    }, []);

    const saveMatch = useCallback(() => {
        if (!currentUser || !editingMatch) return;
        
        const updatedMatch = {
            ...editingMatch,
            opponent: tempOpponent,
            date: tempDate,
            score: tempSets
        };

        const updatedUser = {
            ...currentUser,
            matches: currentUser.matches.map(match => 
                match.id === editingMatch.id ? updatedMatch : match
            )
        };

        setUsers(prev =>
            prev.map(user =>
                user.username === currentUser.username ? updatedUser : user
            )
        );

        setEditingMatch(null);
    }, [currentUser, editingMatch, tempOpponent, tempDate, tempSets, setUsers]);

    const addSet = useCallback(() => {
        const newSet: Set = {
            simple: newSetSimple,
            score1: newSetSimple ? newSetScore1 : 0,
            score2: newSetSimple ? newSetScore2 : 0,
            games: newSetSimple ? [] : [newGameWon],
            win: newSetSimple ? (newSetScore1 > newSetScore2) : newGameWon
        };
        setTempSets([...tempSets, newSet]);
        setNewSetScore1(0);
        setNewSetScore2(0);
        setNewGameWon(true);
    }, [tempSets, newSetSimple, newSetScore1, newSetScore2, newGameWon]);

    const addGame = useCallback((setIndex: number) => {
        const updatedSets = [...tempSets];
        updatedSets[setIndex].games.push(newGameWon);
        updatedSets[setIndex].score1 = updatedSets[setIndex].games.filter(g => g).length;
        updatedSets[setIndex].score2 = updatedSets[setIndex].games.filter(g => !g).length;
        updatedSets[setIndex].win = updatedSets[setIndex].score1 > updatedSets[setIndex].score2;
        setTempSets(updatedSets);
    }, [tempSets, newGameWon]);

    const removeSet = useCallback((index: number) => {
        const updatedSets = [...tempSets];
        updatedSets.splice(index, 1);
        setTempSets(updatedSets);
    }, [tempSets]);

    return (
        <div className="w-full flex flex-col items-center">
            {editingMatch && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3 max-h-[80vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Edit Match</h2>
                        
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2">Opponent</label>
                            <input
                                type="text"
                                className="w-full p-2 border bg-gray-700 rounded"
                                value={tempOpponent}
                                onChange={(e) => { setTempOpponent(e.target.value); }}
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2">Date</label>
                            <input
                                type="date"
                                className="w-full p-2 border bg-gray-700 rounded"
                                value={tempDate}
                                onChange={(e) => { setTempDate(e.target.value); }}
                            />
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">Sets</h3>
                            {tempSets.map((set, setIndex) => (
                                <div key={`edit-set-${setIndex}`} className="bg-gray-700 mb-3 p-2 border border-gray-200 rounded">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium">Set {setIndex + 1}</span>
                                        <button 
                                            className="text-red-500 text-sm"
                                            onClick={() => { removeSet(setIndex); }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    {set.simple ? (
                                        <div className="flex items-center gap-2">
                                            <span>Simple Score:</span>
                                            <input
                                                type="number"
                                                className="w-16 p-1 bg-gray-700 border border-gray-300 rounded"
                                                value={`${set.score1}`}
                                                onChange={(e) => {
                                                    const updatedSets = [...tempSets];
                                                    updatedSets[setIndex].score1 = parseInt(e.target.value) || 0;
                                                    updatedSets[setIndex].win = updatedSets[setIndex].score1 > updatedSets[setIndex].score2;
                                                    setTempSets(updatedSets);
                                                }}
                                            />
                                            <span>-</span>
                                            <input
                                                type="number"
                                                className="w-16 p-1 bg-gray-700 border border-gray-300 rounded"
                                                value={`${set.score2}`}
                                                onChange={(e) => {
                                                    const updatedSets = [...tempSets];
                                                    updatedSets[setIndex].score2 = parseInt(e.target.value) || 0;
                                                    updatedSets[setIndex].win = updatedSets[setIndex].score1 > updatedSets[setIndex].score2;
                                                    setTempSets(updatedSets);
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span>Games: {set.score1}-{set.score2}</span>
                                                <button 
                                                    className="px-2 py-1 bg-[#3E82FC] text-white rounded text-sm"
                                                    onClick={() => { addGame(setIndex); }}
                                                >
                                                    Add Game
                                                </button>
                                                <div className="flex gap-1">
                                                    <label className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="mr-1"
                                                            checked={newGameWon}
                                                            onChange={(e) => { setNewGameWon(e.target.checked); }}
                                                        />
                                                        Won
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {set.games.map((won, gameIndex) => (
                                                    <div 
                                                        key={`edit-game-${setIndex}-${gameIndex}`}
                                                        className={`w-4 h-4 rounded-full ${won ? 'bg-[#3E82FC]' : 'bg-gray-300'}`}
                                                        title={`Game ${gameIndex + 1}: ${won ? 'Won' : 'Lost'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div className="mt-4 p-4 border border-gray-200 rounded bg-gray-700">
                                <h4 className="font-medium mb-2">Add New Set</h4>
                                <div className="flex items-center gap-2 mb-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="mr-1"
                                            checked={newSetSimple}
                                            onChange={(e) => { setNewSetSimple(e.target.checked); }}
                                        />
                                        Simple Score
                                    </label>
                                </div>

                                {newSetSimple ? (
                                    <div className="flex items-center gap-2 mb-2">
                                        <input
                                            type="number"
                                            className="w-16 p-1 border border-gray-300 bg-gray-700 rounded"
                                            value={newSetScore1}
                                            onChange={(e) => { setNewSetScore1(parseInt(e.target.value) || 0); }}
                                        />
                                        <span>-</span>
                                        <input
                                            type="number"
                                            className="w-16 p-1 border border-gray-300 bg-gray-700 rounded"
                                            value={newSetScore2}
                                            onChange={(e) => { setNewSetScore2(parseInt(e.target.value) || 0); }}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 mb-2">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="mr-1"
                                                checked={newGameWon}
                                                onChange={(e) => { setNewGameWon(e.target.checked); }}
                                            />
                                            First Game Won
                                        </label>
                                    </div>
                                )}

                                <button 
                                    className="w-full py-2 bg-[#3E82FC] text-white rounded"
                                    onClick={() => { addSet(); }}
                                >
                                    Add Set
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex justify-end gap-2 mt-4">
                            <button 
                                className="px-4 py-2 bg-gray-700 rounded"
                                onClick={() => { setEditingMatch(null); }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="px-4 py-2 bg-[#3E82FC] text-white rounded"
                                onClick={() => { saveMatch(); }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="border-4 border-[#3E82FC] shadow-[0px_4px_0px_#3E82FC] rounded-full w-1/2 flex flex-row p-2 pl-4 pr-2 my-4 h-16 items-center">
                <h1 className="text-3xl font-semibold"> <p className="inline text-[#3E82FC]">{'• '}</p>Matches</h1>
                {(currentUser == null || currentUser.matches.length == 0) && (
                    <div className="ml-auto mr-4 justify-center">
                        <h2 className="text-lg italic text-gray-400">No matches to display...</h2>
                    </div>
                )}
                {currentUser !== null && (
                    <div className="ml-auto flex flex-row gap-2 justify-center mr-2">
                        <button className="p-1 px-2" onClick={() => { addMatch(); }}>
                            <p className="underline decoration-[#3E82FC] underline-offset-2 decoration-2">+ New</p>
                        </button>
                    </div>
                )}
            </div>
            
            

            <div className="w-2/3 space-y-4 mb-4 overflow-auto h-full scrollbar pr-2">
                {currentUser?.matches.map((match) => (
                    <div key={`match-${match.id}`} className={`border-2 ${(match.score.filter((set) => set.win).length > match.score.filter((set) => !set.win).length) ? "border-[#84cc16] shadow-[0px_4px_0px_#84cc16]" : "border-[#FF746C] shadow-[0px_4px_0px_#FF746C]"} rounded-2xl p-4`}>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xl font-semibold">
                                {match.score.length > 0 ?
                                        (match.score.filter((set) => set.win).length > match.score.filter((set) => !set.win).length) ? 
                                        <p className="inline text-[#84cc16]">Win</p>
                                        : 
                                        <p className="inline text-[#FF746C]">Loss</p>
                                        :
                                        <p className="inline text-gray-200">No Score</p>
                                    } • {typeof match.opponent === 'object' ? 
                                        match.opponent.username : 
                                        match.opponent}
                                    {" • " + new Date(match.date).toLocaleDateString()}
                            </h3>
                            <span className="text-gray-200 text-sm">
                                <button className="p-1 px-2" onClick={() => { editMatch(match); }}>
                                    <p className={`underline ${(match.score.filter((set) => set.win).length > match.score.filter((set) => !set.win).length) ? "decoration-[#84cc16]" : "decoration-[#FF746C]"} underline-offset-2 decoration-2`}>Edit</p>
                                </button>
                                <button className="p-1 px-2" onClick={() => { deleteMatch(match.id); }}>
                                    <p className={`underline ${(match.score.filter((set) => set.win).length > match.score.filter((set) => !set.win).length) ? "decoration-[#84cc16]" : "decoration-[#FF746C]"} underline-offset-2 decoration-2`}>Remove</p>
                                </button>
                            </span>
                        </div>
                        
                        {match.score.length > 0 ? (
                            <div className="space-y-2">
                                {match.score.map((set, setIndex) => (
                                    <div key={`match-${match.id}-set-${setIndex}`} className="rounded p-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-medium">Set {setIndex + 1} ({set.win ? "Win" : "Loss"})</span>
                                            <span className="text-md">
                                                {set.score1} - {set.score2}
                                            </span>
                                        </div>
                                        {!set.simple && (
                                            <div className="flex gap-1 mt-2">
                                                {set.games.map((won, gameIndex) => (
                                                    <div 
                                                        key={`match-${match.id}-set-${setIndex}-game-${gameIndex}`}
                                                        className={`w-4 h-4 rounded-full ${won ? 'bg-[#84cc16]' : 'bg-[#FF746C]'}`}
                                                        title={`Game ${gameIndex + 1}: ${won ? 'Won' : 'Lost'}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
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
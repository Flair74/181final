export interface Match {
    id: string,
    opponent: string | User,
    score: Set[],
    date: string,
}
  
export interface User {
    username: string;
    password: string;
    friends: User[];
    matches: Match[];
}

export interface Set {
    simple: boolean,
    score1: number,
    score2: number,
    games: boolean[],
    win: boolean
}
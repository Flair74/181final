export interface Match {
    id: string,
    opponent: string | User,
    score: Set[],
    date: string,
}

export interface Practice {
    id: string,
    date: string,
    description: string,
    rating: number
}
  
export interface User {
    username: string;
    password: string;
    friends: string[];
    matches: Match[];
    practices: Practice[];
}

export interface Set {
    simple: boolean,
    score1: number,
    score2: number,
    games: boolean[],
    win: boolean
}
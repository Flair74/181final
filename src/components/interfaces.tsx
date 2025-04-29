export interface Match {
    players: User[]
}
  
export interface User {
    username: string;
    password: string;
    friends: User[];
    matches: Match[];
  }
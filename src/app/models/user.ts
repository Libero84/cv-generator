export interface User {
  createdAt: Date;
  email: string;
  id: number;
  isBlocked: boolean;
  roles: string[];
  updatedAt: Date;
  username: string;
}

export interface UserBackcend {
  status: number;
  user: User;
}

export interface UsersBackend {
  status: number;
  user: User[];
}

export interface UserBanned {
  status: number;
  isBlocked: boolean;
}

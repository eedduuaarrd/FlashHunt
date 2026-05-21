export interface HuntObject {
  id: string;
  key: string;
  name: string;
  englishQuery: string; // Used to help guide the AI
  desc: string;
  points: number;
  difficulty: 'Fàcil' | 'Mitjana' | 'Difícil';
  verified: boolean;
  photoUrl?: string;
  verifyDate?: string;
  hintsRevealed?: number[]; // indices of hints revealed
}

export interface Player {
  id: string;
  nickname: string;
  city: string;
  points: number;
  foundCount: number;
  durationSeconds: number; // Time elapsed since start
  isFriend: boolean;
  friendStatus: 'none' | 'sent' | 'received' | 'friends';
  mosaic: { objectKey: string; photoUrl: string; date: string }[];
  lastActive?: string;
}

export interface ActivityLog {
  id: string;
  nickname: string;
  objectKey: string;
  objectName: string;
  points: number;
  timestamp: string;
}

export interface TeamMember {
  nickname: string;
  pointsContributed: number;
  joinedAt: string;
  avatarBg: string;
}

export interface Team {
  id: string;
  name: string;
  passcode?: string;
  targetScore: number;
  points: number;
  members: TeamMember[];
  rank?: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  target: number;
  current: number;
  rewardPoints: number;
  badgeName: string;
  completed: boolean;
  expiresIn: string; // Display duration
}

export interface Hint {
  cost: number;
  clue: string;
  unlocked: boolean;
}

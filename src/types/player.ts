export interface Player {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
  stats?: Record<string, number>;
  achievements?: Array<{
    id: string;
    name: string;
    description: string;
    unlockedAt: string;
  }>;
} 
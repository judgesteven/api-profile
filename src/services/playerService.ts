import { API_CONFIG } from '@/config/api';
import { Player } from '@/types/player';

interface TeamData {
  id: string;
  name: string;
  icon: string;
  description: string;
  points: number;
  credits: number;
  level: { id: string; name: string; description: string; imgUrl: string; ordinal: number };
  createdOn: string;
  isAvailable: boolean;
  players: Player[];
}

export async function getPlayer(): Promise<Player> {
  console.log('Fetching player data from:', `${API_CONFIG.baseUrl}/players/${API_CONFIG.playerId}?account=${API_CONFIG.account}`);
  console.log('Headers:', {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'api-key': API_CONFIG.apiKey
  });

  const response = await fetch(
    `${API_CONFIG.baseUrl}/players/${API_CONFIG.playerId}?account=${API_CONFIG.account}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api-key': API_CONFIG.apiKey
      },
    }
  );

  console.log('Response status:', response.status);
  const data = await response.json();
  console.log('Raw API response:', data);

  if (!response.ok) {
    throw new Error(`Failed to fetch player data: ${response.status} ${response.statusText}`);
  }

  // Transform the data to match our Player interface
  const player: Player = {
    id: data.id || '',
    name: data.name || '',
    description: data.description || '',
    imgUrl: data.imgUrl || '',
    ordinal: data.ordinal || 0,
    points: data.points || 0,
    credits: data.credits || 0,
    level: data.level || 0,
    team: data.team || 'None'
  };

  console.log('Transformed player data:', player);
  return player;
}

export async function getTeam(teamId: string): Promise<TeamData> {
  console.log('Fetching team data for team ID:', teamId);
  
  const response = await fetch(
    `${API_CONFIG.baseUrl}/teams/${teamId}?account=${API_CONFIG.account}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api-key': API_CONFIG.apiKey
      },
    }
  );

  console.log('Team response status:', response.status);
  const data = await response.json();
  console.log('Raw team data:', data);

  if (!response.ok) {
    throw new Error(`Failed to fetch team data: ${response.status} ${response.statusText}`);
  }

  // Extract team data from the nested structure
  const teamData = data.team;
  console.log('Extracted team data:', teamData);

  return {
    id: teamData.id || '',
    name: teamData.name || 'Unknown Team',
    icon: teamData.imgUrl || '',
    description: teamData.description || '',
    points: teamData.points || 0,
    credits: teamData.credits || 0,
    level: teamData.level || { id: '', name: '', description: '', imgUrl: '', ordinal: 0 },
    createdOn: teamData.createdOn || '',
    isAvailable: teamData.isAvailable || false,
    players: data.players || []
  };
} 
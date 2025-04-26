import { API_CONFIG } from '@/config/api';
import { Player } from '@/types/player';

export async function getPlayer(): Promise<Player> {
  const response = await fetch(
    `${API_CONFIG.baseUrl}/accounts/${API_CONFIG.account}/players/${API_CONFIG.playerId}`,
    {
      headers: {
        'Authorization': `Bearer ${API_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch player data');
  }

  return response.json();
} 
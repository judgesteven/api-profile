import React, { useEffect, useState } from 'react';
import { getTeam } from '@/services/playerService';

interface PlayerProfileProps {
  name: string;
  imgUrl: string;
  points: number;
  credits: number;
  team: string;
  level: number;
}

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
  players: any[];
}

export default function PlayerProfile({
  name,
  imgUrl,
  points,
  credits,
  team,
  level
}: PlayerProfileProps) {
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setIsLoading(true);
        const data = await getTeam(team);
        console.log('Team data received in component:', data);
        setTeamData(data);
      } catch (error) {
        console.error('Error fetching team data:', error);
        setTeamData(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (team) {
      fetchTeamData();
    }
  }, [team]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm w-full">
      {/* Avatar and Name */}
      <div className="flex flex-col items-center mb-6">
        {imgUrl && (
          <div className="bg-gray-50 p-4 rounded-full mb-4 shadow-sm">
            <img
              src={imgUrl}
              alt={name || 'Player avatar'}
              className="h-28 w-28 rounded-full object-cover"
            />
          </div>
        )}
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          {name || 'No name available'}
        </h1>
        <p className="text-gray-500">Level {level}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
            <span className="text-sm font-medium">{points.toLocaleString()} Points</span>
          </div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
            <span className="text-sm font-medium">{credits.toLocaleString()} Credits</span>
          </div>
        </div>
        {isLoading ? (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800">
            <span className="text-sm font-medium">Loading team...</span>
          </div>
        ) : teamData ? (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800">
            <span className="text-sm font-medium">Team: {teamData.name}</span>
          </div>
        ) : (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800">
            <span className="text-sm font-medium">No team</span>
          </div>
        )}
      </div>
    </div>
  );
} 
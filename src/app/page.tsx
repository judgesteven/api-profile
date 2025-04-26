'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { getPlayer } from '@/services/playerService';
import PlayerProfile from '@/components/PlayerProfile';

export default function ProfilePage() {
  const [name, setName] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [points, setPoints] = useState<number>(0);
  const [credits, setCredits] = useState<number>(0);
  const [team, setTeam] = useState<string>('');
  const [level, setLevel] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playerData = await getPlayer();
        console.log('Player data received:', playerData);
        setName(playerData.name || '');
        setImgUrl(playerData.imgUrl || '');
        setPoints(playerData.points || 0);
        setCredits(playerData.credits || 0);
        setTeam(playerData.team || '');
        const levelValue = typeof playerData.level === 'number' ? playerData.level : 0;
        setLevel(levelValue);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">
          <h2 className="text-xl font-bold mb-2">Error Loading Player Data</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <PlayerProfile
        name={name}
        imgUrl={imgUrl}
        points={points}
        credits={credits}
        team={team}
        level={level}
      />
    </div>
  );
} 
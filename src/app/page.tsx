'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { Player } from '@/types/player';
import { getPlayer } from '@/services/playerService';

export default function ProfilePage() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const data = await getPlayer();
        setPlayer(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
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
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">No player data found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center space-x-4">
            {player.avatar && (
              <img
                src={player.avatar}
                alt={player.displayName}
                className="h-20 w-20 rounded-full"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{player.displayName}</h1>
              <p className="text-gray-500">@{player.username}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Player Information</h2>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Player ID</dt>
                <dd className="mt-1 text-sm text-gray-900">{player.id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Created At</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(player.createdAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>

          {player.stats && Object.keys(player.stats).length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Stats</h2>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Object.entries(player.stats).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-sm font-medium text-gray-500">{key}</dt>
                    <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {player.achievements && player.achievements.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
              <div className="space-y-4">
                {player.achievements.map((achievement) => (
                  <div key={achievement.id} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900">{achievement.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{achievement.description}</p>
                    <p className="mt-2 text-xs text-gray-400">
                      Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
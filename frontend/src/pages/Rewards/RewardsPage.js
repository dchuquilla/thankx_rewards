import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import RewardCard from '../../components/Rewards/RewardCard';
import './RewardsPage.css';

const RewardsPage = () => {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await api.get('/v1/rewards');
        setRewards(response.data.rewards);
      } catch (error) {
        console.error('Error fetching rewards:', error);
      }
    };

    fetchRewards();
  }, []);

  return (
    <div className="rewards-page">
      <h1>Rewards</h1>
      <ul>
        {rewards.map(reward => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </ul>
    </div>
  );
}

export default RewardsPage;

import React, { useState, useEffect } from 'react';
import api from '../../services/api';
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
          <li key={reward.id}>
            <h2>
              <span className="reward-name">{reward.name}</span>
              <span className="reward-points">{reward.points_cost}</span>
            </h2>
            <p className="description">{reward.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RewardsPage;

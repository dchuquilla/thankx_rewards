
import React from 'react';
import api from '../services/api';

const RewardCard = ({ reward, setPointsBalance }) => {
  const handleRedemption = async () => {
    try {
      const response = await api.post('/v1/users/redeem', { rewardId: reward.id });
      if (response.status === 200) {
        setPointsBalance(response.data.newPointsBalance); // Update points balance
      }
    } catch (error) {
      console.error('Error redeeming reward:', error);
    }
  };

  return (
    <div className="reward-card">
      <h3>{reward.name}</h3>
      <button onClick={handleRedemption}>Redeem</button>
    </div>
  );
};

export default RewardCard;


import React from 'react';
import './RewardCard.css';
import { redeemReward } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const RewardCard = ({ reward, setPointsBalance }) => {
  const { isAuthenticated } = useAuth();
  const handleRedemption = async () => {
    try {
      const redimResponse = await redeemReward(reward.id);
      setPointsBalance((prevPoints) => prevPoints - redimResponse.points_cost);
      alert('Reward redeemed successfully!');
    } catch (error) {
      console.error('Error redeeming reward:', error);
      alert(`Failed to redeem reward. ${error.response.data.errors[0]}`);
    }
  };

  return (
    <li>
      <h2>
        <span className="reward-name">{reward.name}</span>
        <span className="reward-points">{reward.points_cost}</span>
      </h2>
      <p className="description">{reward.description}</p>
      {isAuthenticated() ? (
        <button onClick={handleRedemption}>Redeem</button>
        ) : (
          null
        )}
    </li>
  );
}

export default RewardCard;

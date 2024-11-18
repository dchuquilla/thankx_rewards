
import React from 'react';
import './RewardCard.css';

const RewardCard = ({ reward }) => {
  return (
    <li>
      <h2>
        <span className="reward-name">{reward.name}</span>
        <span className="reward-points">{reward.points_cost}</span>
      </h2>
      <p className="description">{reward.description}</p>
    </li>
  );
}

export default RewardCard;

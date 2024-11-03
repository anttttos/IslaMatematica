// components/ChallengeCard.js
const ChallengeCard = ({ title, description }) => {
    return (
      <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  };
  
  export default ChallengeCard;
  
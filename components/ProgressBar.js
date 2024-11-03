// components/ProgressBar.js
const ProgressBar = ({ progress }) => {
    return (
      <div style={{ width: '100%', backgroundColor: '#ddd' }}>
        <div style={{ width: `${progress}%`, height: '20px', backgroundColor: '#4CAF50' }}></div>
      </div>
    );
  };
  
  export default ProgressBar;
  
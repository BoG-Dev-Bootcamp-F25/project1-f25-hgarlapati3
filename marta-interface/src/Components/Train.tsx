// import './Train.css';
// import React from 'react';

// interface TrainProps {
//   DESTINATION: string;
//   DIRECTION: string;
//   EVENT_TIME: string;
//   LINE: string;
//   NEXT_ARR: string;
//   STATION: string;
//   TRAIN_ID: string;
//   WAITING_SECONDS: string;
//   WAITING_TIME: string;
//   DELAY: string;
// }

// export default function Train({ 
//   DESTINATION, 
//   DIRECTION, 
//   NEXT_ARR, 
//   STATION, 
//   TRAIN_ID, 
//   WAITING_TIME,
//   DELAY 
// }: TrainProps) {
//   const isOnTime = DELAY === "T0S";
  
//   return (
//     <div className="train-card">
//       <div className="train-header">
//         <h3 className="train-destination">
//           {DESTINATION}
//         </h3>
//         <span className={`train-status ${isOnTime ? 'on-time' : 'delayed'}`}>
//           {isOnTime ? 'On Time' : 'Delayed'}
//         </span>
//       </div>
      
//       <div className="train-details">
//         <p>
//           <strong>Direction:</strong> {DIRECTION}
//         </p>
//         <p>
//           <strong>Station:</strong> {STATION}
//         </p>
//         <p>
//           <strong>Next Arrival:</strong> {NEXT_ARR}
//         </p>
//         <p>
//           <strong>Waiting Time:</strong> {WAITING_TIME}
//         </p>
//         <p>
//           <strong>Train ID:</strong> {TRAIN_ID}
//         </p>
//       </div>
//     </div>
//   );
// }

import "./Train.css";
import React from 'react';

import "./Train.css";

interface Props {
  DESTINATION: string;
  DIRECTION: string;
  EVENT_TIME: string;
  LINE: string;
  NEXT_ARR: string;
  STATION: string;
  TRAIN_ID: string | number;
  WAITING_SECONDS: string;
  WAITING_TIME: string;
  DELAY: string;
}

export default function Train(props: Props) {
  const { DESTINATION, DIRECTION, LINE, NEXT_ARR, STATION, WAITING_TIME, DELAY } = props;
  const color = (LINE || "").toLowerCase();
  const isOnTime = DELAY === "T0S" || NEXT_ARR === "Arriving";
  const eta = WAITING_TIME && /\d/.test(WAITING_TIME)
    ? WAITING_TIME
    : NEXT_ARR === "Arriving"
    ? "0 min"
    : "—";

  return (
    <div className="train-row">
      <div className="train-icon">M</div>
      <div className="train-info">
        <div className="train-route">
          <span>{STATION}</span>
          <span className="arrow"> --&gt; </span>
          <span>{DESTINATION}</span>
        </div>
        <div className="train-tags">
          <span className={`badge line-badge ${color}`}>{LINE?.toUpperCase()}</span>
          <span className={`badge status-badge ${isOnTime ? "on-time" : "delayed"}`}>
            {isOnTime ? "On Time" : "Delayed"}
          </span>
        </div>
      </div>
      <div className="train-time">{eta}</div>
    </div>
  );
}

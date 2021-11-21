import React, { useEffect } from "react";
import Timer from "react-compound-timer";

const TimerVideo = ({ startCapture, stopCapture }) => {
  return (
    <Timer
      startImmediately={false}
      onStart={startCapture}
      onStop={stopCapture}
      checkpoints={[
        {
          time: 300000,
          callback: () => {
            stopCapture();
          },
        },
      ]}
    >
      {({ start, stop, reset }) => (
        <div>
          <div>
            <Timer.Minutes /> minutes
            <Timer.Seconds /> seconds
          </div>

          <br />
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                start();
              }}
            >
              Start
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                stop();
                reset();
              }}
            >
              Stop
            </button>
          </div>
        </div>
      )}
    </Timer>
  );
};

export default TimerVideo;

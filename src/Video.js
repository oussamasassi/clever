import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import TimerVideo from "./TimerVideo";

const Video = ({ times }) => {
  const webcamRef = useRef(null);
  const [repeat, setRepeat] = useState(true);
  const [repeatTimes, setRepeatTimes] = useState(times);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  //const [initial, setInitial] = useState(true);
  const [video, setVideo] = useState(null);
  const [videoVis, setVideoVis] = useState(false);
  const [chronoState, setChronoState] = useState(false);

  useEffect(() => {
    if (repeatTimes == 1) {
      setRepeat(false);
    }
  }, [repeatTimes]);

  // start function

  const handleStartCaptureClick = useCallback(() => {
    setVideoVis(false);
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, capturing, videoVis]);

  //restart func

  const handleRestartStartCaptureClick = useCallback(() => {
    setVideo(null);
    setRecordedChunks([]);
    setVideoVis(false);
    setCapturing(true);
    // setRepeatTimes(repeatTimes - 1);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, capturing, videoVis, video]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    setVideoVis(true);
    mediaRecorderRef.current.stop();

    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing, capturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      //console.log(recordedChunks);
      const blob = new Blob(recordedChunks, {
        type: "video/mp4",
      });
      const url = URL.createObjectURL(blob);
      /*const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";*/

      setVideo(url);
    }
  }, [recordedChunks, video, capturing]);

  return (
    <div>
      {!videoVis && <Webcam audio={true} ref={webcamRef} />}

      {videoVis && (
        <div>
          <video src={video} autoPlay="true" />
          {repeat && (
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Restart
            </button>
          )}

          <button onClick={handleDownload}>Voir Enregistrement</button>
        </div>
      )}
      <TimerVideo
        startCapture={handleStartCaptureClick}
        stopCapture={handleStopCaptureClick}
      />
    </div>
  );
};

export default Video;

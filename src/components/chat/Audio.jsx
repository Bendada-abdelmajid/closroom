
import React, { useState, useRef, useEffect } from 'react';
import {GrPauseFill, GrPlayFill } from "react-icons/gr";
function Audio({ src }) {
  const [playState, setPlayState] = useState(false);
  const [duration, setDuration] = useState("00:00");
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const playAudio = () => {
    setPlayState(true);
    audioRef.current.play();
  };

  const pauseAudio = () => {
    setPlayState(false);
    audioRef.current.pause();
  };

  const withUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    console.log(currentTime)
    formatTime(currentTime)
    const songDuration = audioRef.current.duration;
    const progressWidth = (currentTime / songDuration) * 100;
    progressBarRef.current.style.width = `${progressWidth}%`;
  };

  const progress = (e) => {
    const silderValue = e.target.value;
    const widths = silderValue + "%";
    progressBarRef.current.style.width = widths;
    const clickedOffsetX = silderValue / 100;
    const songDuration = audioRef.current.duration;
    audioRef.current.currentTime = clickedOffsetX * songDuration;
  };

 
  function formatTime(time) {
    var min = Math.floor(time / 60);
    var sec = Math.floor(time % 60);
    setDuration(min + ':' + ((sec<10) ? ('0' + sec) : sec));
  }
  if (!src) return null
  return (
    <div className="audio-player center">
    
      {playState ? (
        <div className="btn center" onClick={pauseAudio}>
          <GrPauseFill />
        </div>
      ) : (
        <div className="btn center" onClick={playAudio}>
          <GrPlayFill />
        </div>
      )}
      <div className="time">{duration}</div>
      <div className="progress-cont">
        
        <div className="progress-bar" ref={progressBarRef}>
        <div className="pin"></div>
        </div>
        <input type="range" min="0" max="100" onInput={progress} />
      </div>
      <audio src={src} ref={audioRef} onTimeUpdate={withUpdate} onEnded={()=>setPlayState(false)} style={{ display: "none" }}></audio>
    </div>
  );
}

export default Audio;


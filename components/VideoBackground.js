import React from "react";

const VideoBackground = ({ src, opacity = 0.1 }) => {
  return (
    <div className="video-background">
      <video autoPlay loop muted playsInline>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <style jsx>{`
        .video-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1;
        }
        .video-background video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: ${opacity};
        }
      `}</style>
    </div>
  );
};

export default VideoBackground;

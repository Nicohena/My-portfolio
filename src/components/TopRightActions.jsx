import React, { useState, useEffect, useRef } from 'react';
import './TopRightActions.css';

export default function TopRightActions() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio instance
    audioRef.current = new Audio('/music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.15;

    const tryPlay = async () => {
      try {
        await audioRef.current.play();
        setIsMuted(false); // Autoplay succeeded
      } catch (err) {
        // Autoplay blocked by browser policy, wait for user interaction
        setIsMuted(true);
      }
    };

    tryPlay();

    // If blocked, play on first user interaction anywhere on the document
    const handleFirstInteract = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsMuted(false);
        }).catch(() => {});
      }
      document.removeEventListener('click', handleFirstInteract);
    };

    document.addEventListener('click', handleFirstInteract);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      document.removeEventListener('click', handleFirstInteract);
    };
  }, []);

  const handleGetInTouch = (e) => {
    e.stopPropagation();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = (e) => {
    e.stopPropagation(); // prevent global interaction handler from overriding toggle
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.play().catch(() => {});
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  return (
    <div className="top-right-actions">
      <button className="get-in-touch-btn" onClick={handleGetInTouch}>
        Get In Touch
      </button>
      <button className="sound-btn" onClick={toggleSound} aria-label={isMuted ? "Unmute" : "Mute"}>
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          {isMuted ? (
            <>
              <path d="M13.5 3C14.3284 3 15 3.67157 15 4.5V19.5C15 20.3284 14.3284 21 13.5 21C13.208 21 12.9248 20.9163 12.6841 20.7606L7.20239 17.2144C6.5492 16.7918 5.7925 16.5 5 16.5H4C2.89543 16.5 2 15.6046 2 14.5V9.5C2 8.39543 2.89543 7.5 4 7.5H5C5.7925 7.5 6.5492 7.2082 7.20239 6.78564L12.6841 3.2394C12.9248 3.08365 13.208 3 13.5 3Z" />
              <path d="M18.5 9L23.5 14M23.5 9L18.5 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </>
          ) : (
            <path d="M13.5 3C14.3284 3 15 3.67157 15 4.5V19.5C15 20.3284 14.3284 21 13.5 21C13.208 21 12.9248 20.9163 12.6841 20.7606L7.20239 17.2144C6.5492 16.7918 5.7925 16.5 5 16.5H4C2.89543 16.5 2 15.6046 2 14.5V9.5C2 8.39543 2.89543 7.5 4 7.5H5C5.7925 7.5 6.5492 7.2082 7.20239 6.78564L12.6841 3.2394C12.9248 3.08365 13.208 3 13.5 3Z" />
          )}
        </svg>
      </button>
    </div>
  );
}

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const STORAGE_KEY_PREFIX = 'listening_test_audio_';

const AudioPlayer = ({ audioUrl, questionId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);
  const updateTimeoutRef = useRef(null);

  // Get stored values from localStorage using questionId as unique identifier
  const getStoredData = useCallback(() => {
    const key = `${STORAGE_KEY_PREFIX}${questionId}`;
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : { playCount: 0, position: 0, lastButton: null };
  }, [questionId]);

  const [playData, setPlayData] = useState(getStoredData());
  const { playCount, position, lastButton: currentButton } = playData;

  // Update localStorage with debounce
  const updateStoredData = useCallback((newData) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(() => {
      const key = `${STORAGE_KEY_PREFIX}${questionId}`;
      setPlayData(newData);
      localStorage.setItem(key, JSON.stringify(newData));
    }, 500); // Debounce for 500ms
  }, [questionId]);

  useEffect(() => {
    console.log('AudioPlayer received URL:', audioUrl);
    console.log('Question ID:', questionId);
    
    if (!audioUrl) {
      console.warn('No audio URL provided to AudioPlayer for question:', questionId);
      setError('No audio URL provided');
      setIsLoading(false);
      return;
    }

    // Reset error state when new URL is provided
    setError(null);
    setIsLoading(true);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (audioRef.current) {
      // Prevent seeking
      audioRef.current.addEventListener('seeking', preventSeeking);
      audioRef.current.addEventListener('seeked', preventSeeking);
      
      // Handle audio events
      audioRef.current.addEventListener('error', handleError);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadeddata', () => {
        console.log('Audio loaded successfully');
        setIsLoading(false);
      });
      audioRef.current.addEventListener('waiting', () => setIsLoading(true));
      audioRef.current.addEventListener('canplaythrough', () => setIsLoading(false));
      
      // Preload audio
      audioRef.current.preload = 'auto';
      
      // Set initial position if there was a stored position
      if (position > 0) {
        audioRef.current.currentTime = position;
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if (audioRef.current) {
        audioRef.current.removeEventListener('seeking', preventSeeking);
        audioRef.current.removeEventListener('seeked', preventSeeking);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadeddata', () => setIsLoading(false));
        audioRef.current.removeEventListener('waiting', () => setIsLoading(true));
        audioRef.current.removeEventListener('canplaythrough', () => setIsLoading(false));
      }

      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [position, questionId, audioUrl]);

  const preventSeeking = (e) => {
    if (audioRef.current && position !== audioRef.current.currentTime) {
      audioRef.current.currentTime = position;
    }
  };

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      updateStoredData({
        ...playData,
        position: audioRef.current.currentTime
      });
    }
  }, [playData, updateStoredData]);

  const handleError = useCallback((e) => {
    console.error('Audio error:', e);
    setError(isOnline 
      ? 'Audio failed to load. Please try again or contact support.'
      : 'No internet connection. Please check your connection and try again.');
    setIsPlaying(false);
    setIsLoading(false);
    updateStoredData({ ...playData, lastButton: null });
  }, [isOnline, playData, updateStoredData]);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    updateStoredData({
      ...playData,
      position: 0,
      lastButton: null
    });
  }, [playData, updateStoredData]);

  const handlePlayPause = useCallback((buttonNumber) => {
    if (playCount >= 2 && !isPlaying) {
      setError('You have reached the maximum number of plays (2)');
      return;
    }

    if (!isOnline) {
      setError('No internet connection. Please check your connection and try again.');
      return;
    }

    if (isLoading) {
      return; // Prevent interaction while loading
    }

    if (isPlaying && currentButton === buttonNumber) {
      // Pause current playback
      audioRef.current?.pause();
      setIsPlaying(false);
      updateStoredData({
        ...playData,
        lastButton: null
      });
    } else if (!isPlaying) {
      // Start new playback
      const startingNewPlay = currentButton !== buttonNumber;
      
      audioRef.current?.play().then(() => {
        setIsPlaying(true);
        updateStoredData({
          ...playData,
          playCount: startingNewPlay ? playCount + 1 : playCount,
          lastButton: buttonNumber,
          position: startingNewPlay ? 0 : position
        });
      }).catch(error => {
        console.error('Playback failed:', error);
        setError('Failed to play audio. Please try again.');
      });
    }
  }, [isOnline, isLoading, isPlaying, currentButton, playData, playCount, position, updateStoredData]);

  return (
    <div className="w-full">
      <audio 
        ref={audioRef} 
        src={audioUrl}
        controlsList="nodownload noplaybackrate" 
      />
      
      {error ? (
        <div className="text-red-600 text-center py-4 text-sm">{error}</div>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => handlePlayPause(1)}
            disabled={(playCount >= 1 && !isPlaying && currentButton !== 1) || !isOnline || isLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors duration-200
              ${(playCount >= 1 && !isPlaying && currentButton !== 1) || !isOnline || isLoading
                ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50' 
                : 'border-[#4255D4] text-[#4255D4] hover:bg-[#F8F9FF] bg-white'
              }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            ) : isPlaying && currentButton === 1 ? (
              <FaPause className="text-sm" />
            ) : (
              <FaPlay className="text-sm" />
            )}
            <span className="text-sm font-medium">
              {isPlaying && currentButton === 1 ? 'Pause' : 'Play first time'}
            </span>
          </button>

          <button
            onClick={() => handlePlayPause(2)}
            disabled={(playCount >= 2 && !isPlaying && currentButton !== 2) || playCount === 0 || !isOnline || isLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors duration-200
              ${((playCount >= 2 && !isPlaying && currentButton !== 2) || playCount === 0 || !isOnline || isLoading)
                ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50' 
                : 'border-[#4255D4] text-[#4255D4] hover:bg-[#F8F9FF] bg-white'
              }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            ) : isPlaying && currentButton === 2 ? (
              <FaPause className="text-sm" />
            ) : (
              <FaPlay className="text-sm" />
            )}
            <span className="text-sm font-medium">
              {isPlaying && currentButton === 2 ? 'Pause' : 'Play second time'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer; 
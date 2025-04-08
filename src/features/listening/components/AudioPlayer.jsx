import React from 'react';
import { Button } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';

const AudioPlayer = ({ 
  currentQuestionIndex, 
  isPlaying,
  currentAudio,
  historyListen,
  toggleAudio 
}) => {
  return (
    <div className="flex gap-6">
      <Button
        className="!rounded-full"
        type="primary"
        ghost
        icon={
          isPlaying && currentAudio === `audio-${currentQuestionIndex}-first` ? (
            <PauseCircleOutlined />
          ) : (
            <PlayCircleOutlined />
          )
        }
        onClick={() => toggleAudio(`audio-${currentQuestionIndex}-first`)}
        key={`audio-${currentQuestionIndex}-first`}
        disabled={
          historyListen.length > 0 &&
          historyListen
            .find(
              (item) => item.key === `audio-${currentQuestionIndex}-first`
            )
            ?.value.includes(`audio-${currentQuestionIndex}-first`)
        }
      >
        {isPlaying && currentAudio === `audio-${currentQuestionIndex}-first` 
          ? "Stop" 
          : "Play first time"}
      </Button>
      <Button
        className="!rounded-full"
        type="primary"
        ghost
        icon={
          isPlaying && currentAudio === `audio-${currentQuestionIndex}-second` ? (
            <PauseCircleOutlined />
          ) : (
            <PlayCircleOutlined />
          )
        }
        onClick={() => toggleAudio(`audio-${currentQuestionIndex}-second`)}
        key={`audio-${currentQuestionIndex}-second`}
        disabled={
          (historyListen.length > 0 &&
            historyListen
              .find(
                (item) =>
                  item.key === `audio-${currentQuestionIndex}-second`
              )
              ?.value.includes(`audio-${currentQuestionIndex}-second`)) ||
          !historyListen
            .find(
              (item) => item.key === `audio-${currentQuestionIndex}-first`
            )
            ?.value.includes(`audio-${currentQuestionIndex}-first`)
        }
      >
        {isPlaying && currentAudio === `audio-${currentQuestionIndex}-second`
          ? "Stop"
          : "Play second time"}
      </Button>
    </div>
  );
};

export default AudioPlayer;

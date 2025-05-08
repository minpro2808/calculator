import React from 'react';

interface EmotionDisplayProps {
  emotion: string;
}

export const EmotionDisplay: React.FC<EmotionDisplayProps> = ({ emotion }) => {
  const getEmoji = () => {
    switch (emotion) {
      case 'happy':
        return '😊';
      case 'sad':
        return '😢';
      case 'confused':
        return '😕';
      case 'stressed':
        return '😫';
      case 'thinking':
        return '🤔';
      case 'neutral':
        return '😐';
      default:
        return '🙂';
    }
  };

  const getMessage = () => {
    switch (emotion) {
      case 'happy':
        return '와! 계산이 잘 되고 있어요!';
      case 'sad':
        return '음수가 나왔네요...';
      case 'confused':
        return '뭔가 잘못된 것 같아요...';
      case 'stressed':
        return '너무 복잡한데요...';
      case 'thinking':
        return '음... 생각 중이에요';
      case 'neutral':
        return '계산할 준비가 되었어요!';
      default:
        return '안녕하세요!';
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="text-6xl mb-2">{getEmoji()}</div>
      <div className="text-sm text-gray-600">{getMessage()}</div>
    </div>
  );
}; 
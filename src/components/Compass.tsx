import React, { useState, useRef } from 'react';

interface CompassProps {
  angle: number;
  onChange: (newAngle: number) => void;
}

const Compass: React.FC<CompassProps> = ({ angle, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const compassRef = useRef<HTMLDivElement>(null);

  const calculateAngle = (event: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!compassRef.current) return;
    const rect = compassRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radians = Math.atan2(y - centerY, x - centerX);
    const newAngle = (radians * (180 / Math.PI) + 90 + 360) % 360;
    onChange(newAngle);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true);
    calculateAngle(event);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      calculateAngle(event);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={compassRef}
      className="relative w-full h-full flex items-center justify-center cursor-pointer rounded-full bg-base-200 shadow"
      onMouseDown={handleMouseDown}
    >
      <svg 
        className="absolute w-full h-full"
        style={{ transform: `rotate(${angle}deg)` }}
        viewBox="0 0 100 100"
      >
        <polygon 
          className="fill-neutral"
          points="50,5 60,30 50,25 40,30" 
        />
      </svg>
      <div className="absolute text-center text-3xl font-bold">
        {Math.round(angle)}°
      </div>
      
    </div>
  );
};

export default Compass;
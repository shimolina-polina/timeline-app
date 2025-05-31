import styled from "styled-components";
import Dot from "./Dot/Dot";
import { useEffect, useState, type Dispatch } from "react";

const Container = styled.div<{ radius: number; rotation: number }>`
    position: relative;
    width: ${p => p.radius * 2}px;
    height: ${p => p.radius * 2}px;
    z-index: 3;
    border-radius: 50%;
    border: 1px solid rgba(66, 86, 122, 0.2);
    box-sizing: border-box;
    transform: rotate(${p => p.rotation}deg);
    transition: transform 0.8s cubic-bezier(0.3, 0.7, 0.2, 1);


    @media (max-width: 1160px) {
        border: none;
        width: 0;
        transform: rotate(0deg);
        height: 130px
    }
    
    @media (max-width: 550px) {
        height: 80px
    }

`;


interface CircleWithDotsProps {
  count: number;
  currentIndex: number;
  setCurrentIndex: Dispatch<React.SetStateAction<number>>;
  currentType: string;
}

export default function CircleWithDots({ count, currentIndex, setCurrentIndex, currentType}: CircleWithDotsProps) {
  const [rotation, setRotation] = useState<number>(-360 / count);

  const handleDotClick = (angle: number, index: number) => {
    setRotation(-(angle + 360 / count));
    setCurrentIndex(index)
  };

  useEffect(() => {
    const angle = (360 / count) * currentIndex;
    setRotation(-(angle + 360 / count));
  }, [currentIndex])

  const dots = Array.from({ length: count }, (_, i) => {
    const angle = (360 / count) * i;
    return <Dot key={i} angle={angle} radius={536 / 2} number={i + 1} onClick={() => handleDotClick(angle, i)} isCircle={currentIndex===i} rotation={rotation} label={currentType}/>;
  });

  return (
    <Container radius={536 / 2} rotation={rotation}>
        {dots}
    </Container>

  )
}
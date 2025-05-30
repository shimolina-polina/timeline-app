import styled from "styled-components";

interface DotProps {
  angle: number;
  radius: number;
  number: number;
  label: string;
}

const DotWrapper = styled.div<{ angle: number; radius: number }>`
  position: absolute;
  z-index: 2000;
  top: 50%;
  left: 50%;
  transform: 
    translate(-50%, -50%)
    rotate(${p => p.angle}deg)
    translate(${p => p.radius}px)
    rotate(-${p => p.angle}deg);
  transform-origin: center;
  @media (max-width: 1330px) {
    display: none;
  }
`;

const Label = styled.div<{ $position?: 'left' | 'right' }>`
  position: absolute;
  font-size: 20px;
  z-index: 2000;
  font-weight: bold;
  color: #42567a;
  white-space: nowrap;
  ${p => p.$position === 'right' ? 'left: calc(100% + 16px);' : 'right: calc(100% + 16px);'}
  top: 50%;
  transform: translateY(-50%);
`;

const Circle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid rgba(48, 62, 88, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42567A;
  font-size: 20px;
  background: #F4F5F9;
  
`;


export default function ComplexDot({ angle, radius, number, label }: DotProps) {
    const isRightSide = [0, 1, 5].includes(number);
    const labelPosition = isRightSide ? 'right' : 'left';

    return (
    <DotWrapper angle={angle} radius={radius}>
      <Circle>{number + 1}</Circle>
      <Label $position={labelPosition}>{label}</Label>
    </DotWrapper>
  );
}

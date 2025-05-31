import { styled } from "styled-components";


const DotContainer = styled.div<{ angle: number; radius: number, isCircle: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: 
    translate(-50%, -50%)
    rotate(${p => p.angle}deg)
    translateX(${p => p.radius}px);
  transform-origin: center;
  transition: all 0.3s ease;
  cursor: pointer;

  width: ${({ isCircle }) => isCircle ? '56px' : '5px'};
  height: ${({ isCircle }) => isCircle ? '56px' : '5px'};

  &:hover {
    width: 56px;
    height: 56px;
  }

  &::before {
    content: "";
    position: absolute;
    top: -25px;
    left: -25px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    pointer-events: all;
  }


  @media (max-width: 1160px) {
    display: none;
  }
`;

const DotCircle = styled.div<{isCircle: boolean; rotation: number;}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #42567A;
  border-radius: 50%;
  transition: all 0.3s ease;
  transform: rotate(${p => -p.rotation}deg);

  width: ${({ isCircle }) => isCircle ? '56px' : '100%'};
  height: ${({ isCircle }) => isCircle ? '56px' : '100%'};
  background: ${({ isCircle }) => isCircle ? '#F4F5F9' : '#42567A'};
  border: ${({ isCircle }) => isCircle ? '1px solid rgba(48, 62, 88, 0.5)' : 'none'};

  ${DotContainer}:hover & {
    background: #F4F5F9;
    width: 56px;
    height: 56px;
    border: 1px solid rgba(48, 62, 88, 0.5);
  }
`;

const DotNumber = styled.div<{ angle: number; isCircle: boolean; rotation: number }>`
  position: absolute;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  top: 50%;
  left: 50%;
  color: #42567A;
  font-size: 0;
  font-weight: bold;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;

  ${({ isCircle, rotation, angle }) => isCircle && `
  font-size: 20px;
  transform: translate(-50%, -50%) rotate(${- rotation - angle}deg) ;

`}
  ${DotContainer}:hover & {
    transform: 
    translate(-50%, -50%)
    rotate(${p =>  - p.angle - p.rotation}deg);
    font-size: 20px;
  }
`;

const DotLabel = styled.div<{ angle: number; rotation: number }>`
  position: absolute;
  white-space: nowrap;
  color: #42567A;
  font-size: 20px;
  font-weight: bold;
  top: 50%;
  left: 50%;
  //transform: translate(0%, 0%) rotate(${p =>  - p.angle - p.rotation}deg);
  transform-origin: center;
  pointer-events: none;

  ${({ angle, rotation }) => {
    return `
      transform: 
      rotate(${-angle - rotation}deg)
      translate(100%, 50%);
    `;
  }}
`;


const Dot = ({ angle, radius, number, onClick, isCircle, rotation, label}: { angle: number; radius: number; number: number; onClick: () => void; isCircle: boolean; rotation: number; label: string}) => (
  <DotContainer angle={angle} radius={radius} onClick={onClick} isCircle={isCircle} >
    <DotCircle isCircle={isCircle} rotation={rotation}/>
    <DotNumber angle={angle} isCircle={isCircle} rotation={rotation}>{number}</DotNumber>
    {isCircle && <DotLabel angle={angle} rotation={rotation}>{label}</DotLabel>}
  </DotContainer>
);

export default Dot;
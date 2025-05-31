import { styled } from "styled-components";
import ArrowSvg from '../../assets/Vector2.svg';
import PeriodDotsNavigation from "./PeriodDotsNavigation/PeriodDotsNavigation";

const Arrow = styled(ArrowSvg)<{ direction?: "left" | "right" }>`
  width: 6.25px;
  height: 12.5px;
  color: #42567A;
  transform: ${({ direction }) => direction === "left" ? "none" : "rotate(180deg)"};
  display: block;
`;



const PeriodNavigationWrapper = styled.div`
    width: calc(100% - 70px);
    order: 1;

    @media (max-width: 550px) {
      order: 2;
    }
`

const PeriodNavigation = styled.div`
  margin-left: 60px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 20px;
  @media (max-width: 550px) {
      margin-left: 20px;
      gap: 10.67px;
    }
`;

const PeriodText = styled.div`
  font-size: 14px;
  color: #42567a;
`;

const PeriodButtons = styled.div`
  display: flex;
  gap: 20px;
  @media(max-width: 320px) {
    gap: 8.3px;

  }
`;

const PeriodButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #d6d9e5;
  background: transparent;
  cursor: pointer;
  color: #42567a;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
  @media(max-width: 320px) {
    width: 25px;
    height: 25px;

  }
`;

interface IPeriodNavigation {
    currentIndex: number;
    totalPeriods: number;
    onPrevPeriod: () => void;
    onNextPeriod: () => void;
}  


const PeriodNavigationSlider = ({ currentIndex, totalPeriods, onPrevPeriod, onNextPeriod }: IPeriodNavigation) => {
    return (
      <>
        <PeriodNavigationWrapper>
            <PeriodNavigation>
                <PeriodText>
                    {String(currentIndex + 1).padStart(2, "0")}/{String(totalPeriods).padStart(2, "0")}
                </PeriodText>
                <PeriodButtons>
                    <PeriodButton onClick={onPrevPeriod} disabled={currentIndex === 0}>
                        <Arrow direction="right" />
                    </PeriodButton>
                    <PeriodButton onClick={onNextPeriod} disabled={currentIndex === totalPeriods - 1}>
                        <Arrow direction="left" />
                    </PeriodButton>
                    
                </PeriodButtons>
                
            </PeriodNavigation>
            
        </PeriodNavigationWrapper>
        <PeriodDotsNavigation currentIndex={currentIndex} totalPeriods={totalPeriods} />
        </>
    )
}

export default PeriodNavigationSlider
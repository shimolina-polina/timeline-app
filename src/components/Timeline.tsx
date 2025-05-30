import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import type { ITimeSegment } from "../interfaces/ITimeSegment";
import CircleWithDots from "./CircleWithDOts/CircleWIthDots";
import ContentSlider from "./ContentSlider/ContentSlider";
import PeriodNavigationSlider from "./PeriodNavigation/PeriodNavigation";
import type { Dispatch } from "react";

const Wrapper = styled.div`
  background: #f4f5f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  width: 353px;
  margin-left: 70px;
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: bold;
  color: #42567a;
`;

interface YearProps {
  side: "left" | "right";
}

const Year = styled.div<YearProps>`
  position: absolute;
    user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  font-size: 200px;
  font-weight: bold;
  top: 50%;
  letter-spacing: -0.02em;
  transform: translateY(-50%);
  color: ${(props) => (props.side === "left" ? "#5D5FEF" : "#EF5DA8")};
  ${(props) => (props.side === "left" ? "left: -15px;" : "right: 15px;")}
  @media (max-width: 1160px) {
    font-size: 150px;
    ${(props) => (props.side === "left" ? "left: 95px;" : "right: 125px;")}
  }
`;

const CircleWrapper = styled.div`
  width: 973px;
  position: relative;
  display: flex;
  margin-top: -105px;
  justify-content: center;
  align-items: center;
  @media (max-width: 1330px) {
    width: 900px;
  }
`;

const GradientLine = styled.div`
  width: 5px;
  height: 120px;
  background: linear-gradient(to bottom, #3877ee, #ef5da8);
  @media (max-width: 1330px) {
    display: none;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;


const MainWrapper = styled.div`
    position: relative;
    max-width: 1440px;
    width: 90vw;
    min-height: 100vh;
    border: solid 1px rgba(66, 86, 122, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 104px;
    &::before {
        content: '';
        z-index: 1999;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 1px;
        height: 100%;
        background: rgba(66, 86, 122, 0.2);
    }

    &::after {
        content: '';
        z-index: 1999;
        position: absolute;
        top: 467.4px;
        left: 0;
        width: 100%;
        height: 1px;
        background: rgba(66, 86, 122, 0.2);
    }

    @media (max-width: 1330px) {
        border: none;
        width: 100vw;
        &::before {
            display: none;
        }
        &::after {
            display: none;
        }
    }
`

interface ITimelineProps {
    data: ITimeSegment;
    currentIndex: number;
    setCurrentIndex: Dispatch<React.SetStateAction<number>>;
    totalPeriods: number;
    onPrevPeriod: () => void;
    onNextPeriod: () => void;
}  


export default function Timeline({ data, currentIndex, setCurrentIndex, totalPeriods, onPrevPeriod, onNextPeriod }: ITimelineProps) {

  return (
    <Wrapper>
      <MainWrapper>
        <div style={{ width: "100%", marginTop: "170px" }}>
          <TitleContainer>
            <GradientLine />
            <TitleWrapper>
              <Title>Исторические даты</Title>
            </TitleWrapper>
          </TitleContainer>
        </div>

        <CircleWrapper>
          <Year side="left">{data.from}</Year>
          <CircleWithDots count={totalPeriods} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} currentType={data.type}/>
          <Year side="right">{data.to}</Year>
        </CircleWrapper>

        <PeriodNavigationSlider currentIndex={currentIndex} totalPeriods={totalPeriods} onPrevPeriod={onPrevPeriod} onNextPeriod={onNextPeriod} />
        
        <ContentSlider events={data.events}/>
      </MainWrapper>
    </Wrapper>
  );
}

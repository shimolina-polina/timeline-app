import { styled } from "styled-components";

interface Props {
  totalPeriods: number;
  currentIndex: number;
}

const DotsWrapper = styled.div`
  display: none;

  @media (max-width: 320px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    height: 6px;
    position: absolute;
    bottom: 32px;
    width: 100%;
  }
`;

const Dot = styled.div<{ active: boolean }>`
  width: 6px;
  height: 6px;
  background-color: rgba(66, 86, 122, 1);
  opacity: ${({ active }) => (active ? 1 : 0.4)};
  border-radius: 10px;
`;

const PeriodDotsNavigation = ({ totalPeriods, currentIndex }: Props) => {
  return (
    <DotsWrapper>
      {Array.from({ length: totalPeriods }, (_, i) => (
        <Dot key={i} active={i === currentIndex} />
      ))}
    </DotsWrapper>
  );
};

export default PeriodDotsNavigation;

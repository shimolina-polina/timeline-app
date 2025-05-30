import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Navigation } from "swiper/modules";
import type { IEvent } from "../../interfaces/ITimeSegment";
import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";

const SliderContainer = styled.div`
    min-width: 880px;
  width: calc(100% - 70px);
  margin-top: 40px;
  position: relative;
  padding: 0 60px;
  box-sizing: border-box;`
;

const NavArrow = styled.button<{ direction: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ direction }) => (direction === "left" ? "left: 0;" : "right: 0;")}
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #ffffff;
  cursor: pointer;
  font-size: 24px;
  color: #42567a;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 0 15px rgba(56, 119, 238, 0.1);

  &:hover {
    background: #f0f0f0;
  }
;`

const StyledSwiper = styled(Swiper)`
  width: 100%;
  box-sizing: border-box;
;
`
const Event = styled.div`
  width: 350px;
  @media (max-width: 1330px) {
    width: 250px; // или например 300px, если нужна фиксированная ширина
  }
;`

const EventYear = styled.h3`
  font-family: 'Bebas Neue', sans-serif;
  color: #3877ee;
  font-size: 25px;
  font-weight: 400;
;`

const EventText = styled.p`
  font-weight: 400;
  font-size: 20px;
  margin-top: 15px;
  color: #42567a;
;`


const ContentSlider = ({ events }: { events: IEvent[] }) => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [displayedEvents, setDisplayedEvents] = useState<IEvent[]>(events);
    const swiperRef = useRef<any>(null);
    const slidesRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (!slidesRef.current) return;
  
      const wrapper = slidesRef.current.querySelector(".swiper-wrapper");
      if (!wrapper) return;
  
      gsap.to(wrapper, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setDisplayedEvents(events);
  
          setTimeout(() => {
            gsap.to(wrapper, {
              opacity: 1,
              duration: 0.5,
            });
          }, 50);
        },
      });
    }, [events]);
  
    return (
      <SliderContainer>
        {!isBeginning && (
          <NavArrow direction="left" onClick={() => swiperRef.current?.slidePrev()}>
            &#8249;
          </NavArrow>
        )}
  
        {!isEnd && (
          <NavArrow direction="right" onClick={() => swiperRef.current?.slideNext()}>
            &#8250;
          </NavArrow>
        )}
  
        <div ref={slidesRef}>
          <StyledSwiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            modules={[Navigation]}
            slidesPerView={3}
            slidesPerGroup={3}
            spaceBetween={80}
            navigation={false}
            loop={false}
          >
            {displayedEvents.map((event, idx) => (
              <SwiperSlide key={idx}>
                <Event>
                  <EventYear>{event.year}</EventYear>
                  <EventText>{event.text}</EventText>
                </Event>
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </div>
      </SliderContainer>
    );
  };
  

export default ContentSlider;
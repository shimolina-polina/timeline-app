import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Navigation } from "swiper/modules";
import type { IEvent } from "../../interfaces/ITimeSegment";
import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";
import ArrowSvg from '../../assets/Vector2.svg';

const SliderContainer = styled.div`
width: 100%;
margin-top: 40px;
position: relative;
padding: 0 95px;
box-sizing: border-box;
order: 2;

@media (max-width: 550px) {
    order: 1;
    padding: 0 20px;
}
`;



const ArrowSVG = ({ direction }: { direction: "left" | "right" }) => (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: direction === "left" ? "rotate(180deg)" : "none" }}
    >
      <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

const NavArrow = styled.button<{ direction: "left" | "right" }>`
position: absolute;
top: 50%;
${({ direction }) => (direction === "left" ? "left: 40px;" : "right: 40px;")}
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

@media (max-width: 550px) {
    display: none;
}
;`

const StyledSwiper = styled(Swiper)`
width: 100%;
box-sizing: border-box;
@media (max-width: 550px) {
    min-height: 120px;
}
;
`
const Event = styled.div.withConfig({
shouldForwardProp: (prop) => prop !== "visible",
})<{ visible?: boolean }>`
width: 300px;
opacity: ${(props) => (props.visible? 1 : 0.3)};
transition: opacity 0.3s ease;

@media (max-width: 1340px) {
    width: 250px;
}

@media (max-width: 1020px) {
    width: 230px;
}

@media (max-width: 550px) {
    width: 166px;
}
`;

const EventYear = styled.h3`
font-family: 'Bebas Neue', sans-serif;
color: #3877ee;
font-size: 25px;
font-weight: 400;
@media (max-width: 550px) {
    font-size: 16px;
}
;`

const EventText = styled.p`
font-weight: 400;
font-size: 20px;
margin-top: 15px;
color: #42567a;
@media (max-width: 550px) {
    font-size: 14px;
}
;`

const StyledSwiperSlide = styled(SwiperSlide)`
@media (max-width: 550px) {
    width: 166px !important;
    flex-shrink: 0 !important;
}
`;


const ContentSlider = ({ events }: { events: IEvent[] }) => {
const [isBeginning, setIsBeginning] = useState(true);
const [isEnd, setIsEnd] = useState(false);
const [displayedEvents, setDisplayedEvents] = useState<IEvent[]>(events);
const [visibleSlides, setVisibleSlides] = useState<boolean[]>([]);
const swiperRef = useRef<any>(null);
const slidesRef = useRef<HTMLDivElement>(null);
const containerRef = useRef<HTMLDivElement>(null);

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

const updateVisibility = () => {
    if (!containerRef.current || !slidesRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const slides = slidesRef.current.querySelectorAll('.swiper-slide') ?? [];
    
    const updatedVisibility: (boolean)[] = [];
    
    slides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();

        console.log({
            index: index,
            slideLeft: rect.left,
            slideRight: rect.right,
            containerLeft: containerRect.left,
            containerRight: containerRect.right,
            fullyVisible: rect.left >= containerRect.left && rect.right <= containerRect.right
          });
          
    
        const fullyVisible = rect.left >= containerRect.left && rect.right <= containerRect.right;    
        updatedVisibility.push(fullyVisible ? true : false);
    });
    
    setVisibleSlides(updatedVisibility as any);
    };

useEffect(() => {
    updateVisibility();
    window.addEventListener('resize', updateVisibility);
    return () => window.removeEventListener('resize', updateVisibility);
}, [displayedEvents]);

return (
    <SliderContainer ref={containerRef}>
    {!isBeginning && (
        <NavArrow direction="left" onClick={() => swiperRef.current?.slidePrev()}>
            <ArrowSVG direction="left" />
        </NavArrow>
    )}

    {!isEnd && (
        <NavArrow direction="right" onClick={() => swiperRef.current?.slideNext()}>
            <ArrowSVG direction="right" />
        </NavArrow>
    )}

    <div ref={slidesRef}>
        <StyledSwiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onTransitionEnd={() => {
                const swiper = swiperRef.current;
                if (!swiper) return;

                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
                updateVisibility();
            }}
            modules={[Navigation]}
            slidesPerView={3}
            slidesPerGroup={3}
            slidesPerGroupSkip={0}
            watchSlidesProgress
            spaceBetween={80}
            navigation={false}
            loop={false}
            breakpoints={{
                0: {
                slidesPerView: 'auto',
                spaceBetween: 25,
                slidesPerGroup: 1,
                },
                620: {
                slidesPerView: 2,
                spaceBetween: 50,
                slidesPerGroup: 3,
                },
                840: {
                slidesPerView: 3,
                spaceBetween: 50,
                slidesPerGroup: 3,
                },
                1160: {
                    slidesPerView: 3,
                    spaceBetween: 80,
                    slidesPerGroup: 3,
                }
            }}
        >
        {displayedEvents.map((event, idx) => (
            <StyledSwiperSlide key={idx}>
                <Event visible={visibleSlides[idx]}>
                    <EventYear>{event.year}</EventYear>
                    <EventText>{event.text}</EventText>
                </Event>
            </StyledSwiperSlide>
        ))}
        </StyledSwiper>
    </div>
    </SliderContainer>
);
};


export default ContentSlider;
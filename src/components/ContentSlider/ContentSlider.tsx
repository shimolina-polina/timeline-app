import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Navigation } from "swiper/modules";
import type { IEvent } from "../../interfaces/ITimeSegment";
import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";

const SliderContainer = styled.div`
width: 100%;
margin-top: 40px;
position: relative;
padding: 0 95px;
box-sizing: border-box;
order: 2;

@media (max-width: 320px) {
    order: 1;
    padding: 0 20px;
}
`;

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

@media (max-width: 320px) {
    display: none;
}
;`

const StyledSwiper = styled(Swiper)`
width: 100%;
box-sizing: border-box;
@media (max-width: 320px) {
    min-height: 120px;
}
;
`
const Event = styled.div.withConfig({
shouldForwardProp: (prop) => prop !== "visible",
})<{ visible?: boolean }>`
width: 350px;
opacity: ${(props) => (props.visible? 1 : 0.3)};
transition: opacity 0.3s ease;

@media (max-width: 320px) {
    width: 166px;
}
`;

const EventYear = styled.h3`
font-family: 'Bebas Neue', sans-serif;
color: #3877ee;
font-size: 25px;
font-weight: 400;
@media (max-width: 320px) {
    font-size: 16px;
}
;`

const EventText = styled.p`
font-weight: 400;
font-size: 20px;
margin-top: 15px;
color: #42567a;
@media (max-width: 320px) {
    font-size: 14px;
}
;`

const StyledSwiperSlide = styled(SwiperSlide)`
@media (max-width: 320px) {
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
    const container = containerRef.current;
    const slides = slidesRef.current?.querySelectorAll('.swiper-slide') ?? [];
    
    const updatedVisibility: boolean[] = [];
    
    const containerLeft = container.scrollLeft;
    const containerRight = containerLeft + container.clientWidth;
    
    slides.forEach((slide) => {
      const slideLeft = slide.offsetLeft;
      const slideRight = slideLeft + slide.offsetWidth;
    
      const fullyVisible = slideLeft >= containerLeft && slideRight <= containerRight;
      updatedVisibility.push(fullyVisible);
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

                setTimeout(() => {
                    updateVisibility();
                }, 100);
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
                320: {
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
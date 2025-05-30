import { useState } from "react";
import type { ITimeSegment } from "../interfaces/ITimeSegment";
import Timeline from "./Timeline";

const data: ITimeSegment[] = [
    {
        "from": 2010,
        "to": 2012,
        "events": [
            {
                "year": 2010,
                "text": "Запущен проект OpenAI с целью развития безопасного искусственного интеллекта."
            },
            {
                "year": 2011,
                "text": "NASA завершает программу космических шаттлов после посадки «Атлантиса»."
            },
            {
                "year": 2011,
                "text": "Открытие бозона Хиггса подтверждено экспериментами на Большом адронном коллайдере."
            },
            {
                "year": 2012,
                "text": "В Лондоне проходят XXX летние Олимпийские игры."
            }
        ],
        type: 'Наука'
    },
    {
        "from": 2013,
        "to": 2015,
        "events": [
            {
                "year": 2013,
                "text": "Edward Snowden раскрывает информацию о массовом наблюдении NSA."
            },
            {
                "year": 2014,
                "text": "Запуск Rosetta — первый аппарат, совершивший посадку на комету."
            },
            {
                "year": 2015,
                "text": "В Южной Африке и Антарктиде наблюдается редкое частное солнечное затмение."
            },
            {
                "year": 2015,
                "text": "Создана первая полностью автономная модель автомобиля Tesla."
            }
        ],
        type: 'Наука'
    },
    {
        "from": 2016,
        "to": 2017,
        "events": [
            {
                "year": 2016,
                "text": "Телескоп «Хаббл» обнаружил самую удалённую галактику GN-z11."
            },
            {
                "year": 2016,
                "text": "Искусственный интеллект AlphaGo впервые победил профессионального игрока в Го."
            },
            {
                "year": 2017,
                "text": "Компания Tesla презентовала электрический грузовик Tesla Semi."
            },
            {
                "year": 2017,
                "text": "Космический телескоп «Джеймс Уэбб» завершает сборку и проходит испытания."
            }
        ],
        type: 'Наука'
    },
    {
        "from": 2018,
        "to": 2019,
        "events": [
            {
                "year": 2018,
                "text": "SpaceX запускает первый тестовый полёт Falcon Heavy."
            },
            {
                "year": 2019,
                "text": "Первое изображение чёрной дыры опубликовано благодаря проекту Event Horizon Telescope."
            },
            {
                "year": 2019,
                "text": "Грета Тунберг выступает на саммите ООН, поднимая вопрос климатического кризиса."
            },
            {
                "year": 2019,
                "text": "Илон Маск представил нейроинтерфейс Neuralink."
            }
        ],
        type: 'Наука'
    },
    {
        "from": 2020,
        "to": 2021,
        "events": [
            {
                "year": 2020,
                "text": "Начало пандемии COVID-19, повлиявшей на все аспекты жизни во всем мире."
            },
            {
                "year": 2020,
                "text": "Разработка и внедрение первых mRNA-вакцин против COVID-19."
            },
            {
                "year": 2021,
                "text": "NASA успешно посадил марсоход Perseverance на Марс."
            },
            {
                "year": 2021,
                "text": "Открытие метавселенной: Facebook переименован в Meta и делает ставку на VR/AR технологии."
            }
        ],
        type: 'Наука'
    },
    {
        "from": 2022,
        "to": 2024,
        "events": [
            {
                "year": 2022,
                "text": "Запущен телескоп Джеймс Уэбб и начал передачу первых изображений."
            },
            {
                "year": 2023,
                "text": "ChatGPT стал глобальным инструментом для общения с ИИ."
            },
            {
                "year": 2024,
                "text": "Прорыв в термоядерном синтезе: получена энергия в устойчивом режиме реакции."
            },
            {
                "year": 2024,
                "text": "Крупнейшие страны начали тестирование цифровых валют центральных банков (CBDC)."
            }
        ],
        type: 'Наука'
    }
]


const PeriodSlider = () => {
    const [currentPeriodIndex, setCurrentPeriodIndex] = useState<number>(0);


    const handlePrevPeriod = () => {
        if (currentPeriodIndex > 0) {
            setCurrentPeriodIndex(currentPeriodIndex - 1);
        }
    };
    
    const handleNextPeriod = () => {
        if (currentPeriodIndex < data.length - 1) {
            setCurrentPeriodIndex(currentPeriodIndex + 1);
        }
    };

    return (
        <>
            <Timeline
                data={data[currentPeriodIndex]}
                currentIndex={currentPeriodIndex}
                setCurrentIndex={setCurrentPeriodIndex}
                totalPeriods={data.length}
                onPrevPeriod={handlePrevPeriod}
                onNextPeriod={handleNextPeriod}/>
        </>
    );
}

export default PeriodSlider;
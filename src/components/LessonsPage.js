import {useRef, useState} from 'react';
import Draggable from 'react-draggable';
import Lesson01 from "../lessons/lesson01/app/Lesson01";
import Lesson02 from "../lessons/lesson02/app/Lesson02";
import {useTranslation} from "react-i18next";
import {LanguageSwitcher} from "./LanguageSwitcher";
import './LessonsPage.css';

const lessons = [Lesson01, Lesson02];

export default function LessonsPage() {
    const { i18n } = useTranslation();
    const [currentLesson, setCurrentLesson] = useState(1);
    const nodeRef = useRef(null);
    const CurrentLessonComponent = lessons[currentLesson];

    const handleLessonChange = (event) => {
        setCurrentLesson(Number(event.target.value));
    };

    return (
        <div className="lesson-switcher">
            <Draggable
                handle=".drag-handle"
                bounds="parent"
                defaultPosition={{x: 20, y: 20}}
                nodeRef={nodeRef}
            >
                <div ref={nodeRef} className="floating-nav">
                    <div className="drag-handle">
                        AIT : <b>Vasyl Khvostyk</b> : 49FS ⋮⋮
                    </div>
                    <nav className="lesson-nav">
                        <select
                            value={currentLesson}
                            onChange={handleLessonChange}
                            className="lesson-select"
                        >
                            {lessons.map((_, index) => (
                                <option key={index} value={index}>
                                    Lesson {index + 1}
                                </option>
                            ))}
                        </select>
                        <LanguageSwitcher
                            currentLanguage={i18n.language}
                            onLanguageChange={i18n.changeLanguage}
                        />
                    </nav>
                </div>
            </Draggable>

            <main className="lesson-main">
                <CurrentLessonComponent />
            </main>
        </div>
    );
}

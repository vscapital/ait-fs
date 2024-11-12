import { ChangeEvent, useRef, useState } from "react";
import Draggable from "react-draggable";
import Lesson01 from "../lessons/lesson01/app/Lesson01";
import Lesson02 from "../lessons/lesson02/app/Lesson02";
import Lesson03 from "../lessons/lesson03/app/Lesson03";
import Lesson04 from "../lessons/lesson04/app/Lesson04";
import Lesson05 from "../lessons/lesson05/app/Lesson05";
import Lesson08 from "../lessons/lesson08/app/Lesson08";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import "./LessonsPage.css";

const lessons = [Lesson01, Lesson02, Lesson03, Lesson04, Lesson05, Lesson08];

export default function LessonsPage() {
  const { i18n } = useTranslation();
  const [currentLesson, setCurrentLesson] = useState(lessons.length - 1);
  const nodeRef = useRef(null);
  const CurrentLessonComponent = lessons[currentLesson];

  const handleLessonChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentLesson(Number(event.target.value));
  };

  return (
    <div className="lesson-switcher">
      <Draggable
        handle=".drag-handle"
        bounds="parent"
        defaultPosition={{ x: 20, y: 20 }}
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
              className="text-sm rounded-lg py-0.5"
            >
              {lessons.map((component, index) => (
                <option key={index} value={index}>
                  {component.name} homework
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

import { ChangeEvent, ComponentType, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import "./LessonsPage.css";

const lessonsContext = import.meta.glob("../lessons/lesson*/app/Lesson*.tsx", {
  eager: true,
});

const getLessonNumber = (path: string): number => {
  const match = path.match(/lesson(\d+)/i);
  return match ? parseInt(match[1]) : 0;
};

const lessonComponents = Object.entries(lessonsContext)
  .map(([path, module]) => {
    const lessonNumber = getLessonNumber(path);
    const component = (module as { default: ComponentType }).default;
    const lessonName = `Lesson${String(lessonNumber).padStart(2, "0")}`;

    Object.defineProperty(component, "name", {
      value: lessonName,
      configurable: true,
    });
    Object.defineProperty(component, "displayName", {
      value: lessonName,
      configurable: true,
    });

    return {
      component,
      name: lessonName,
      number: lessonNumber,
    };
  })
  .sort((a, b) => a.number - b.number);

interface LessonComponent {
  component: ComponentType;
  name: string;
  number: number;
}

export default function LessonsPage() {
  const { i18n } = useTranslation();
  const [currentLesson, setCurrentLesson] = useState(
    lessonComponents.length - 1,
  );
  const nodeRef = useRef(null);
  const CurrentLessonComponent = lessonComponents[currentLesson].component;

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
              {lessonComponents.map(
                (lesson: LessonComponent, index: number) => (
                  <option key={lesson.number} value={index}>
                    {lesson.name} homework
                  </option>
                ),
              )}
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

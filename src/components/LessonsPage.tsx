import { ChangeEvent, ComponentType, createElement, useRef } from "react";
import "./LessonsPage.css";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Draggable from "react-draggable";
import { LanguageSwitcher } from "./LanguageSwitcher.tsx";

interface LessonComponent {
  component: ComponentType;
  name: string;
  number: number;
  path: string;
}

const lessonsContext = import.meta.glob("../lessons/lesson*/app/Lesson*.tsx", {
  eager: true,
});

const getLessonNumber = (path: string): number => {
  const match = path.match(/lesson(\d+)/i);
  return match ? parseInt(match[1]) : 0;
};

const lessonComponents: LessonComponent[] = Object.entries(lessonsContext)
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
      path: `lesson/${String(lessonNumber).padStart(2, "0")}`,
    };
  })
  .sort((a, b) => a.number - b.number);

export default function LessonsPage() {
  const { i18n } = useTranslation();
  const nodeRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const currentLessonIndex = lessonComponents.findIndex((lesson) =>
    location.pathname.includes(String(lesson.number).padStart(2, "0")),
  );

  const defaultIndex =
    currentLessonIndex === -1
      ? lessonComponents.length - 1
      : currentLessonIndex;

  const handleLessonChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedLesson = lessonComponents[Number(event.target.value)];
    navigate(selectedLesson.path);
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
              value={defaultIndex}
              onChange={handleLessonChange}
              className="text-sm rounded-lg py-0.5"
            >
              {lessonComponents.map((lesson, index) => (
                <option key={lesson.number} value={index}>
                  {lesson.name} homework
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
        <Routes>
          <Route
            path="/"
            element={createElement(
              lessonComponents[lessonComponents.length - 1].component,
            )}
          />
          {lessonComponents.map((lesson) => (
            <Route
              key={lesson.number}
              path={lesson.path}
              element={createElement(lesson.component)}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

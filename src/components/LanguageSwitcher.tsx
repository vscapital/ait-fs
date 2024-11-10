import { BritishFlag, RussianFlag } from "./Flags.tsx";
import "./languageSwitcher.css";

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (code: string) => void;
}

export const LanguageSwitcher = ({
  currentLanguage,
  onLanguageChange,
}: LanguageSwitcherProps) => {
  const languages = [
    { code: "en", Icon: BritishFlag },
    { code: "ru", Icon: RussianFlag },
  ];

  return (
    <div className="language-switcher">
      {languages.map(({ code, Icon }) => (
        <button
          key={code}
          onClick={() => onLanguageChange(code)}
          className={`language-button ${currentLanguage === code ? "active" : ""}`}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
};

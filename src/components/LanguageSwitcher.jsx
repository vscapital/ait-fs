import { LANGUAGES } from '../i18n/translations';
import { RussianFlag, BritishFlag } from '../i18n/flags';

export const LanguageSwitcher = ({ currentLanguage, onLanguageChange }) => {
    const languages = [
        { code: LANGUAGES.EN, label: 'English', Icon: BritishFlag },
        { code: LANGUAGES.RU, label: 'Русский', Icon: RussianFlag }
    ];

    return (
        <div className="language-switcher">
            {languages.map(({ code, label, Icon }) => (
                <button
                    key={code}
                    onClick={() => onLanguageChange(code)}
                    className={`language-button ${currentLanguage === code ? 'active' : ''}`}
                    title={label}
                >
                    <Icon />
                    <span className="language-label">{label}</span>
                </button>
            ))}
        </div>
    );
};

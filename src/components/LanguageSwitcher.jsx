import {BritishFlag, RussianFlag} from '../i18n-flags';
import './languageSwitcher.css';

export const LanguageSwitcher = ({ currentLanguage, onLanguageChange }) => {
    const languages = [
        { code: 'en', Icon: BritishFlag },
        { code: 'ru',  Icon: RussianFlag }
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
                </button>
            ))}
        </div>
    );
};

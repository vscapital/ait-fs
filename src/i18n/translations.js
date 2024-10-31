export const LANGUAGES = {
    EN: 'en',
    RU: 'ru'
};

export const translations = {
    [LANGUAGES.EN]: {
        'profile-header': 'My Profile',
        'hobbies-header': 'My Hobbies:',
        'footer-text': 'My Profile Page',
        'language-switch': 'Language',
        'en': 'English',
        'ru': 'Russian'
    },
    [LANGUAGES.RU]: {
        'profile-header': 'Мой профиль',
        'hobbies-header': 'Мои увлечения:',
        'footer-text': 'Моя страница профиля',
        'language-switch': 'Язык',
        'en': 'Английский',
        'ru': 'Русский'
    }
};

export const translate = (key, language) => {
    const languageTranslations = translations[language];
    return languageTranslations?.[key] || key;
};

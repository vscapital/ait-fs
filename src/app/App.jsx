import {useState} from 'react';
import {ProfileCard} from '../components/ProfileCard';
import {LanguageSwitcher} from '../components/LanguageSwitcher';
import {LANGUAGES, translate} from '../i18n/translations';
import './App.css';

const profileData = {
    name: 'Vasyl Khvostyk',
    photoUrl: '/assets/images/profile-photo.png',
    hobbies: ['Programming', 'Music Creation', 'Tennis']
};

export const App = () => {
    const [language, setLanguage] = useState(LANGUAGES.EN);
    const currentYear = new Date().getFullYear();

    return (
        <div className="App">
            <header className="header">
                <h1>{translate('profile-header', language)}</h1>
                <LanguageSwitcher
                    currentLanguage={language}
                    onLanguageChange={setLanguage}
                />
            </header>

            <main className="main">
                <ProfileCard
                    {...profileData}
                    translate={translate}
                    language={language}
                />
            </main>

            <footer className="footer">
                <p>© {currentYear} {translate('footer-text', language)}</p>
            </footer>
        </div>
    );
};

export default App;

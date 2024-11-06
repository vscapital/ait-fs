import {useTranslation} from "react-i18next";
import styles from './ProfileCard.module.css';

interface ProfileCardProps {
    name: string;
    photoUrl: string;
    hobbies: string[];
}

export const ProfileCard = ({ name, photoUrl, hobbies } : ProfileCardProps) => {
    const { t, ready } = useTranslation('lesson01', { useSuspense: false });
    if (!ready) {
        return <div>Loading...</div>;
    }
    return (
        <div className={styles.profileCard}>
            <img src={photoUrl} className={styles.profileImage} alt={name}/>
            <h2 className={styles.profileName}>{name}</h2>
            <div className={styles.profileInfo}>
                <h3>{t('hobbies-header')}</h3>
                <ul className={styles.hobbiesList}>
                    {hobbies.map((hobby, index) => (
                        <li key={`hobby-${index}`}>{hobby}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

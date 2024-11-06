import {useTranslation} from "react-i18next";
import styles from './ProfileCard.module.css';

interface ProfileCardProps {
    name: string;
    photoUrl: string;
    activities: string[];
    hobbies: string[];
}

export const ProfileCard = ({ name, photoUrl, activities, hobbies } : ProfileCardProps) => {
    const { t, ready } = useTranslation('lesson02', { useSuspense: false });
    if (!ready) {
        return <div>Loading...</div>;
    }
    return (
        <div className={styles.profileCard}>
            <img src={photoUrl} className={styles.profileImage} alt={name}/>
            <h2 className={styles.profileName}>{name}</h2>
            <div className={styles.columnsContainer}>
                <div className={styles.column}>
                    <h3>{t('activities-header', 'Professional Activities')}</h3>
                    <ul className={styles.list}>
                        {activities.map((activity, index) => (
                            <li key={`activity-${index}`}>{activity}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.column}>
                    <h3>{t('hobbies-header')}</h3>
                    <ul className={styles.list}>
                        {hobbies.map((hobby, index) => (
                            <li key={`hobby-${index}`}>{hobby}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

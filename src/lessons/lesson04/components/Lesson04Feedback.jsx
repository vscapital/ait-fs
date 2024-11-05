import {useState} from 'react';
import styles from './Lesson04Feedback.module.css';
import Button from "../../../components/Button";
import {useTranslation} from "react-i18next";

const Lesson04Feedback = ({ children }) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const { t, ready } = useTranslation('lesson04', { useSuspense: false });
    if (!ready) {
        return <div>Loading...</div>;
    }

    const handleLike = () => {
        setLikes(prev => prev + 1);
    };

    const handleDislike = () => {
        setDislikes(prev => prev + 1);
    };

    const handleReset = () => {
        setLikes(0);
        setDislikes(0);
    };

    return (
        <div className={styles.feedback}>
            <div className={styles.content}>
                {children}
            </div>

            <div className={styles.actions}>
                <div className={styles.voteGroup}>
                    <Button
                        onClick={handleLike}
                        className={styles.voteButton}
                    >
                        <span className={styles.count}>{likes}</span>
                        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                    </Button>

                    <Button
                        onClick={handleDislike}
                        className={styles.voteButton}
                    >
                        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
                        </svg>
                        <span className={styles.count}>{dislikes}</span>
                    </Button>
                </div>

                <Button
                    onClick={handleReset}
                    className={styles.resetButton}
                >
                    {t('reset-button')}
                </Button>
            </div>
        </div>
    );
};

export default Lesson04Feedback;

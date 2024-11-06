import styles from './Lesson04.module.css';
import Lesson04Feedback from "../components/Lesson04Feedback";

export const Lesson04 = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Lesson04Feedback>Some content</Lesson04Feedback>
                <Lesson04Feedback>Another content</Lesson04Feedback>
            </div>
        </div>
    );
};

export default Lesson04;

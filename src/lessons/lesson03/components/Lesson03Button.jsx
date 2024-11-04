import styles from './styles/Lesson03Button.module.css';

export default function Lesson03Button({ label, type, onClick }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={styles.button}
        >
            {label}
        </button>
    );
}

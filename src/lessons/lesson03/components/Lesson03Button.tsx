import styles from './styles/Lesson03Button.module.css';

interface Lesson03ButtonProps {
    label: string;
    type: 'button' | 'submit' | 'reset';
    onClick: () => void;
}

export default function Lesson03Button({ label, type, onClick } : Lesson03ButtonProps) {
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

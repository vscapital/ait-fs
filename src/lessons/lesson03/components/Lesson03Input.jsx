import styles from './styles/Lesson03Input.module.css';

export default function Lesson03Input({ name, value, type, placeholder, label, onChange }) {
    return (
        <div className={styles.inputGroup}>
            <label className={styles.label}>
                {label}
            </label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                className={styles.input}
                onChange={onChange}
                value={value}
            />
        </div>
    );
}

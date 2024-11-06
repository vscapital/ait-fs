import styles from './styles/Lesson03Input.module.css';
import {ChangeEvent} from "react";

interface Lesson03InputProps {
    name: string;
    value: string;
    type: string;
    placeholder: string;
    label: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Lesson03Input({ name, value, type, placeholder, label, onChange } : Lesson03InputProps) {
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

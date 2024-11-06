import styles from './Button.module.css';
import {ReactNode} from "react";

interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const Button = ({ onClick, children, type = 'button', className } : ButtonProps) => (
    <button
        onClick={onClick}
        type={type}
        className={`${styles.button} ${className || ''}`}
    >
        {children}
    </button>
);

export default Button;

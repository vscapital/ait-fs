import styles from "./Button.module.css";

const Button = ({ onClick, children, type = 'button', className }) => (
    <button
        onClick={onClick}
        type={type}
        className={`${styles.button} ${className || ''}`}
    >
        {children}
    </button>
);

export default Button;

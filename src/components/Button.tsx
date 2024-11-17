import styles from "./Button.module.css";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button = ({
  onClick,
  children,
  disabled = false,
  type = "button",
  className,
}: ButtonProps) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={`${styles.button} ${className || ""}`}
  >
    {children}
  </button>
);

export default Button;

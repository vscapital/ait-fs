import Lesson03Input from "./Lesson03Input.js";
import Lesson03Button from "./Lesson03Button.js";
import styles from "./styles/Lesson03LoginForm.module.css";
import { useTranslation } from "react-i18next";
import { ChangeEvent, FormEvent, useState } from "react";

export interface Lesson03LoginFormValues {
  username: string;
  email: string;
  password: string;
}

interface Lesson03LoginFormProps {
  onSubmit: (values: Lesson03LoginFormValues) => void;
}

export default function Lesson03LoginForm({
  onSubmit,
}: Lesson03LoginFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { t, ready } = useTranslation("lesson03", { useSuspense: false });
  if (!ready) {
    return <div>Loading...</div>;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Lesson03Input
        name="username"
        type="text"
        placeholder={t("username-placeholder")}
        label={t("username-label")}
        value={formData.username}
        onChange={handleChange}
      />
      <Lesson03Input
        name="email"
        type="email"
        placeholder={t("email-placeholder")}
        label={t("email-label")}
        value={formData.email}
        onChange={handleChange}
      />
      <Lesson03Input
        name="password"
        type="password"
        placeholder={t("password-placeholder")}
        label={t("password-label")}
        value={formData.password}
        onChange={handleChange}
      />
      <Lesson03Button
        type="submit"
        label={t("login-button")}
        onClick={() => {
          console.log("Login button clicked");
        }}
      />
    </form>
  );
}

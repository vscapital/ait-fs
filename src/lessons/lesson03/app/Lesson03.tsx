import Lesson03LoginForm, {
  Lesson03LoginFormValues,
} from "../components/Lesson03LoginForm";
import styles from "./Lesson03.module.css";
import { useTranslation } from "react-i18next";

export const Lesson03 = () => {
  const { t, ready } = useTranslation("lesson03", { useSuspense: false });
  if (!ready) {
    return <div>Loading...</div>;
  }
  const handleSubmit = (values: Lesson03LoginFormValues) => {
    console.log(values);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t("login-header")}</h2>
        <Lesson03LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Lesson03;

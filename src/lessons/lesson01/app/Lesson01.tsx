import { ProfileCard } from "../components/ProfileCard";
import styles from "./Lesson01.module.css";
import { useTranslation } from "react-i18next";
import profilePhoto from "../../../assets/images/profile-photo.png";

const profileData = {
  name: "Vasyl Khvostyk",
  photoUrl: profilePhoto,
  hobbies: ["Programming", "Music Creation", "Tennis"],
};

export const Lesson01 = () => {
  const currentYear = new Date().getFullYear();
  const { t, ready } = useTranslation("lesson01", { useSuspense: false });
  if (!ready) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>{t("profile-header")}</h1>
      </header>

      <main className={styles.main}>
        <ProfileCard {...profileData} />
      </main>

      <footer className={styles.footer}>
        <p>
          © {currentYear} {t("footer-text")}
        </p>
      </footer>
    </div>
  );
};

export default Lesson01;

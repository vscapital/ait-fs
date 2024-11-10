import React from "react";
import { heroesData } from "./heroesData";
import HeroesGrid from "../components/HeroesGrid";
import styles from "./Lesson05.module.css";
import { useTranslation } from "react-i18next";

export const Lesson05 = () => {
  const { t, ready } = useTranslation("lesson05", { useSuspense: false });
  if (!ready) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{t("title")}</h1>
        <HeroesGrid heroes={heroesData} />
      </div>
    </div>
  );
};

export default Lesson05;

import { Shield, Zap } from "lucide-react";
import styles from "./HeroCard.module.css";
import { useTranslation } from "react-i18next";

interface HeroCardProps {
  name: string;
  realName: string;
  image: string;
  powers: string[];
  skillLevel: number;
  background: string;
}

const HeroCard = ({
  name,
  realName,
  image,
  powers,
  skillLevel,
  background,
}: HeroCardProps) => {
  const { t, ready } = useTranslation("lesson05", { useSuspense: false });
  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.subtitle}>{realName}</p>

        <div className={styles.powerSection}>
          <div className={styles.sectionHeader}>
            <Shield className={styles.icon} />
            <span className={styles.sectionTitle}>{t("power-level")}</span>
          </div>
          <div className={styles.powerBar}>
            <div
              className={styles.powerBarFill}
              style={{ width: `${skillLevel}%` }}
            />
          </div>
        </div>

        <div className={styles.powerSection}>
          <div className={styles.sectionHeader}>
            <Zap className={styles.icon} />
            <span className={styles.sectionTitle}>{t("powers")}</span>
          </div>
          <div className={styles.powersContainer}>
            {powers.map((power, index) => (
              <span key={index} className={styles.powerTag}>
                {power}
              </span>
            ))}
          </div>
        </div>

        <p className={styles.background}>{background}</p>
      </div>
    </div>
  );
};

export default HeroCard;

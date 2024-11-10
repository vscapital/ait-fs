import HeroCard from "./HeroCard";
import styles from "./HeroesGrid.module.css";

interface Hero {
  id: number;
  name: string;
  realName: string;
  image: string;
  powers: string[];
  skillLevel: number;
  background: string;
}

interface HeroesGridProps {
  heroes: Hero[];
}

const HeroesGrid = ({ heroes }: HeroesGridProps) => {
  return (
    <div className={styles.grid}>
      {heroes.map((hero) => (
        <HeroCard
          key={hero.id}
          name={hero.name}
          realName={hero.realName}
          image={hero.image}
          powers={hero.powers}
          skillLevel={hero.skillLevel}
          background={hero.background}
        />
      ))}
    </div>
  );
};

export default HeroesGrid;

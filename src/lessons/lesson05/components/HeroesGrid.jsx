import React from 'react';
import HeroCard from './HeroCard';
import styles from './HeroesGrid.module.css';

const HeroesGrid = ({ heroes }) => {
    return (
        <div className={styles.grid}>
            {heroes.map(hero => (
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

import { ProfileCard } from "../components/ProfileCard";
import styles from "../components/ProfileCard.module.css";

const profiles = [
  {
    name: "Mark Zuckerberg",
    photoUrl:
      "https://kress.oberauer-cloud.com/news_detail_slider/rc/L5qBgvCC/uploads/news/Mark_Zuckerberg_Meta.jpg",
    activities: [
      "CEO of Meta (formerly Facebook)",
      "Tech Entrepreneur",
      "Programmer",
      "Founder of Meta, Instagram, WhatsApp",
      "Philanthropist (Chan Zuckerberg Initiative)",
    ],
    hobbies: [
      "Long-distance running",
      "Learning Mandarin Chinese",
      "Reading (history, science, biographies)",
      "Traveling",
      "Fencing",
      "Home farming (raising goats)",
      "Hunting for food",
      "Brazilian Jiu-Jitsu (BJJ)",
      "Mixed Martial Arts (MMA)",
    ],
  },
  {
    name: "Bill Gates",
    photoUrl:
      "https://pbs.twimg.com/profile_images/1674815862879178752/nTGMV1Eo_400x400.jpg",
    activities: [
      "Co-founder of Microsoft",
      "Tech Pioneer",
      "Co-chair of Bill & Melinda Gates Foundation",
      "Philanthropist",
      "Author",
      "Global Health Advocate",
      "Climate Change Activist",
      "Investor",
      "Advisor on Artificial Intelligence",
    ],
    hobbies: [
      "Reading (reads about 50 books per year)",
      "Bridge (card game)",
      "Tennis",
      "Golf",
      "Traveling for humanitarian causes",
      "Writing",
      "Learning about science and technology",
      "Spending time with family",
      "Documentary watching",
    ],
  },
  {
    name: "Bjarne Stroustrup",
    photoUrl:
      "https://www.chu.cam.ac.uk/wp-content/uploads/2021/12/Bjarne-Stroustrup.jpg",
    activities: [
      "Creator of C++ Programming Language",
      "Computer Scientist",
      "Professor at Columbia University",
      "Technical Fellow at Morgan Stanley",
      'Author of "The C++ Programming Language"',
      "Member of the US National Academy of Engineering",
      "IEEE Computer Society's Computer Entrepreneur Award recipient",
      "Distinguished Research Professor at Texas A&M University (former)",
    ],
    hobbies: [
      "Hiking",
      "Reading history books",
      "Writing technical literature",
      "Sailing",
      "Photography",
      "Studying programming language design",
      "Participating in standardization committees",
      "Mentoring young programmers",
      "Classical music appreciation",
    ],
  },
];

export const Lesson02 = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.gridContainer}>
        {profiles.map((profile, index) => (
          <ProfileCard key={`profile-${index}`} {...profile} />
        ))}
      </div>
    </div>
  );
};

export default Lesson02;

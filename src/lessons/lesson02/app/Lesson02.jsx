import {ProfileCard} from "../components/ProfileCard";

export const Lesson02 = () => {

    return (
        <div>
            <ProfileCard
                name="Mark Zuckerberg"
                photoUrl="https://kress.oberauer-cloud.com/news_detail_slider/rc/L5qBgvCC/uploads/news/Mark_Zuckerberg_Meta.jpg"
                activities={[
                    "CEO of Meta (formerly Facebook)",
                    "Tech Entrepreneur",
                    "Programmer",
                    "Founder of Meta, Instagram, WhatsApp",
                    "Philanthropist (Chan Zuckerberg Initiative)"
                ]}
                hobbies={[
                    "Long-distance running",
                    "Learning Mandarin Chinese",
                    "Reading (history, science, biographies)",
                    "Traveling",
                    "Fencing",
                    "Home farming (raising goats)",
                    "Hunting for food",
                    "Brazilian Jiu-Jitsu (BJJ)",
                    "Mixed Martial Arts (MMA)"
                ]}
            />
        </div>
    );
};

export default Lesson02;

export const ProfileCard = ({ name, photoUrl, hobbies, translate, language }) => {
    return (
        <div className="profile-card">
            <img src={photoUrl} className="profile-image" alt={name}/>
            <h2 className="profile-name">{name}</h2>
            <div className="profile-info">
                <h3>{translate('hobbies-header', language)}</h3>
                <ul className="hobbies-list">
                    {hobbies.map((hobby, index) => (
                        <li key={`hobby-${index}`}>{hobby}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

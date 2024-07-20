import React from "react";
import '../assets/global.scss';

const ListItem = ({ icon, artist, name, data, selectedSong, setSelectedSong }) => {
    const imageUrl = icon ? `https://cms.samespace.com/assets/${icon}` : 'https://via.placeholder.com/48';

    return (
        <div onClick={() => setSelectedSong(data)}>
            <div className={`list_item ${selectedSong.name === name ? 'selected' : ''}`}>
                <div>
                    <img
                        src={imageUrl}
                        alt={name}
                        width={48}
                        height={48}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/48';
                        }}  // Ensure fallback URL is valid
                    />
                </div>
                <div>
                    <div className="song_name">{name}</div>
                    <div className="artist_name">{artist}</div>
                </div>
            </div>
        </div>
    );
}

export default ListItem;

import React from "react";
import '../assets/global.scss';

const ListItem = ({icon, artist, name, index, data, selectedSong, setSelectedSong }) => {
    return(
        <div key={index}>
            <div className={`list_item ${selectedSong.name === name ? 'selected' : ''}`} onClick={()=> setSelectedSong(data)}>
                <div><img src={`https://cms.samespace.com/assets/${icon}`} alt="name" width={48} height={48}/></div>
                <div>
                    <div className="song_name">{name}</div>
                    <div className="artist_name">{artist}</div>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}
export default ListItem;
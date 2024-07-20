import React, { useEffect, useState } from "react";
import ListItem from "../components/list";
import Frame from '../assets/Frame.svg';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import logo from '../assets/Logo.svg';
import profile from '../assets/Profile.svg';
import { useQuery } from '@apollo/client';
import { GET_SONGS } from './graphql'; 

const TABS = {
    for_you: 'for_you',
    top_tracks: 'top_tracks'
};

const Homepage = () => {
    const { loading, error, data: songsData } = useQuery(GET_SONGS);
    const [selectedSong, setSelectedSong] = useState({});
    const [activeTab, setActiveTab] = useState(TABS.for_you);
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showList, setShowList] = useState(true);

    useEffect(() => {
        if (!loading && songsData?.songs) {
            setFilteredData(songsData.songs);
            setSelectedSong(songsData.songs[0] || {});
        }
    }, [loading, songsData]);

    useEffect(() => {
        if (activeTab === TABS.top_tracks) {
            const topTracks = songsData?.songs.filter(item => item.top_track === true);
            setFilteredData(topTracks);
        } else if (activeTab === TABS.for_you) {
            setFilteredData(songsData?.songs);
        }
    }, [activeTab, songsData]);

    function handleNext(data) {
        const index = filteredData.findIndex(item => item.id === data.id);
        if (index !== -1) {
            setSelectedSong(filteredData[(index + 1) % filteredData.length]);
        }
    }

    function handlePrev(data) {
        const index = filteredData.findIndex(item => item.id === data.id);
        if (index !== -1) {
            setSelectedSong(filteredData[(index - 1 + filteredData.length) % filteredData.length]);
        }
    }

    function handleSearch(event) {
        const value = event.target.value.toLowerCase();
        setSearchValue(value);
    }

    return (
        <div className="homepage" style={{background: `linear-gradient(108deg, ${selectedSong.accent || '#000'}, rgba(0, 0, 0, 0.60) 99.84%), #000`}}>
            <div className="sidebar">
                <div>
                    <img src={logo} alt="logo" />
                </div>
                <div>
                    <img src={profile} alt="profile" />
                </div>
            </div>
            <div className="show_list" onClick={() => setShowList(!showList)}>
                {!showList ? "Show List" : "Hide List"}
            </div>
            <div className={showList ? 'middle' : 'middle display_none'}>
                <div className="topbar">
                    <div onClick={() => setActiveTab(TABS.for_you)} className={`for_you ${activeTab === TABS.for_you ? '' : 'not_selected'}`}>For You</div>
                    <div onClick={() => setActiveTab(TABS.top_tracks)} className={`top_tracks ${activeTab === TABS.top_tracks ? '' : 'not_selected'}`}>Top Tracks</div>
                </div>
                <div className="search_bar">
                    <input placeholder="Search Song, Artist" onChange={handleSearch} value={searchValue} />
                    <img src={Frame} alt="search" />
                </div>
                <div className="list_item_container">
                    {filteredData
                        .filter(data => data.name.toLowerCase().includes(searchValue) || data.artist.toLowerCase().includes(searchValue))
                        .map((item, index) => (
                            <ListItem
                                key={index}
                                icon={item.cover?.id ? `https://cms.samespace.com/assets/${item.cover.id}` : 'fallback-image-url'}
                                artist={item.artist}
                                name={item.name}
                                data={item}
                                selectedSong={selectedSong}
                                setSelectedSong={setSelectedSong}
                            />
                        ))}
                </div>
            </div>
            {selectedSong && Object.keys(selectedSong).length > 0 &&
                <div className={showList ? "media-player display_none" : "media-player"}>
                    <div className="played_songs_details">
                        <div className="song_played">{selectedSong.name}</div>
                        <div className="artist_played">{selectedSong.artist}</div>
                    </div>
                    <div className="cover_art_container">
                        <img src={selectedSong.cover?.id ? `https://cms.samespace.com/assets/${selectedSong.cover.id}` : 'fallback-image-url'} alt={selectedSong.name} className="cover_art" />
                    </div>
                    <AudioPlayer
                        autoPlay
                        src={selectedSong.url}
                        showDownloadProgress={false}
                        showSkipControls={true}
                        showJumpControls={false}
                        onClickNext={() => handleNext(selectedSong)}
                        onClickPrevious={() => handlePrev(selectedSong)}
                        onEnded={() => handleNext(selectedSong)}
                    />
                </div>}
        </div>
    );
};

export default Homepage;

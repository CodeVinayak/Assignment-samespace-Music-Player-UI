import React, { useEffect, useState } from "react";
import ListItem from "../components/list";
import Frame from '../assets/Frame.svg'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import logo from '../assets/Logo.svg'
import profile from '../assets/Profile.svg';
import { useQuery } from '@apollo/client';
import { GET_SONGS } from './graphql'; 

const TABS = {
    for_you: 'for_you',
    top_tracks: 'top_tracks'
}

const Homepage = () =>{
    const { loading, error, data: songsData } = useQuery(GET_SONGS);
    const [selectedSong, setSelectedSong] = useState({})
    const [activeTab, setActiveTab] = useState(TABS.for_you);
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue]= useState('');
    const [showList, setShowList] = useState(true);

    useEffect(()=>{
        setFilteredData(!loading ? songsData?.songs: [])
        setActiveTab(TABS.for_you)
    }, [loading])
    useEffect(()=>{
        if(activeTab === TABS.top_tracks){
            let list_of_songs = songsData?.songs.filter((item)=> item.top_track === true);
            setFilteredData(list_of_songs)
        }
        else if(activeTab === TABS.for_you){
            setFilteredData(songsData?.songs)
        }
    },[activeTab])
    function handleNext(data){
        let id = data.id;
        filteredData.forEach((item, index)=> {
            if(item.id === id){

                setSelectedSong(filteredData[(index+1) % filteredData.length])
            }
        })
    }
    function handlePrev(data){
        let id = data.id;
        filteredData.forEach((item, index)=> {
            if(item.id === id){
                setSelectedSong(filteredData[(index - 1 + filteredData.length) % filteredData.length])
            }
        })
    }
   function handleSearch(param1){
        setSearchValue(param1.toLowerCase());
       
    }

    return(
        <div className="homepage" style={{background: `linear-gradient(108deg, ${selectedSong.accent}, rgba(0, 0, 0, 0.60) 99.84%), #000`}}>
            <div className="sidebar">
                <div>
                    <img src={logo} alt="logo"/>
                </div>
                <div>
                    <img src={profile} alt="profile"/>
                </div>
            </div>
            <div className="show_list" onClick={()=> setShowList(!showList)}>{!showList ? "Show List" : "Hide List"}</div>
            <div className={showList ? 'middle' : 'middle display_none'}>
                <div className="topbar">
                    <div onClick={()=> setActiveTab(TABS.for_you)} className={`for_you ${activeTab === TABS.for_you ? '' : 'not_selected'}`}>For You</div>
                    <div onClick={()=> setActiveTab(TABS.top_tracks)} className={`top_tracks ${activeTab === TABS.top_tracks ? '' : 'not_selected'}`}>Top Tracks</div>
                </div>
                <div className="search_bar">
                    <input placeholder="Search Song, Artist" onChange={(event)=> handleSearch(event.target.value, filteredData)}/>
                    <img src={Frame} alt="search"/>
                </div>
                 <div className="list_item_container">
            {filteredData?.filter((data)=> (data.name.toLowerCase().includes(searchValue) || data.artist.toLowerCase().includes(searchValue))).map((item, index)=> {
                return(
                     <ListItem
                        icon = {item.cover?.id}
                        artist={item.artist}
                        name={item.name}
                        data = {item}
                        selectedSong = {selectedSong}
                        setSelectedSong = {(value)=> setSelectedSong(value)}
                        key={index}
                     />
                )
            })} 
            </div>
            </div>
            {selectedSong && Object.keys(selectedSong).length > 0 &&
            <div className={showList? "media-player display_none" : "media-player"}>
                <div className="played_songs_details">
                    <div className="song_played">{selectedSong.name}</div>
                    <div className="artist_played">{selectedSong.artist}</div>
                </div>
                <div className="cover_art_container">
                   <img src={`https://cms.samespace.com/assets/${selectedSong.cover?.id}`} alt="name" className="cover_art"/>
                </div>
                <AudioPlayer
                    autoPlay
                    src={selectedSong.url}
                    showDownloadProgress={false}
                    showSkipControls={true}
                    showJumpControls={false}
                    onClickNext= {(e)=> handleNext(selectedSong)}
                    onClickPrevious= {(e)=> handlePrev(selectedSong)}
                    onEnded={()=> handleNext(selectedSong)}
                />
            </div>}
        </div>
    )
}
export default Homepage;
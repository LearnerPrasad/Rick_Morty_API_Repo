import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';

export default function Cards(props) {
    const [search, setSearch] = useState('');
    const [charactersProfiles, setCharactersProfiles] = useState([]);
    const [overAllData, setOverAllData] = useState([]);
    const [charactersData, setCharactersData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [genderValues, setGenderValues] = useState([]);
    const [speciesValues, setSpeciesValues] = useState([]);
    const [statusValues, setStatusValues] = useState([]);
    const [typeValues, setTypeValues] = useState([]);
    const [filterApplied , setFilterApplied]=useState(false);


    //const [searchedData, setSearchedData] = useState([]);
    const [locationsData, setLocationsData] = useState([]);
    const [episodesData, setEpisodesData] = useState([]);


    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api', {

        })
            .then((response) => {
                console.log(response);
                setLoaded(true)
                setOverAllData([response.data]);
                setCharactersData([response.data.characters])
                // setLocationsData([response.data.locations])
                // setEpisodesData([response.data.episodes])
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    useEffect(() => {
        if (loaded) {
            axios.get(charactersData, {})
                .then(
                    (response) => {
                        setCharactersProfiles(response?.data?.results);
                        setGenderValues([... new Set(response?.data?.results.map(i => { return i.gender }))]);
                        setSpeciesValues([... new Set(response?.data?.results.map(i => { return i.species }))]);
                        setStatusValues([... new Set(response?.data?.results.map(i => { return i.status }))]);
                        setTypeValues([... new Set(response?.data?.results.map(i => { return i.type }))])
                    })
                .catch(
                    (error) => {
                        console.log(error)
                    })
        }
    }, [loaded])

    const uniqueFilterValues = (e,category) => {
        setFilterApplied(true);
        // e?.preventDefault()
        return charactersProfiles.filter(el => el?.gender?.includes(category))
    }

    const getData = () => {
        return charactersProfiles?.filter(i => i?.name?.toLowerCase().includes(search?.toLowerCase()))
        // || i?.gender?.toLowerCase().startsWith(search?.toLowerCase()) || i?.location.name?.toLowerCase().startsWith(search?.toLowerCase()) || i?.status?.toLowerCase().startsWith(search?.toLowerCase()) || i?.type?.toLowerCase().startsWith(search?.toLowerCase()) || i?.species?.toLowerCase().startsWith(search?.toLowerCase())

    }
    return (
        <div className='card p-2 bg-warning text-dark'>
            <div className='d-flex justify-content-end flex-direction-reverse m-2'>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" onChange={(e) => { setSearch(e.target.value) }} placeholder="Search" aria-label="Search" />
                    {/* <Tooltip title='Ability to filter  items on these fields (status, location, episode, gender, species, type'>
                        <IconButton>
                            <InfoIcon />
                        </IconButton>
                    </Tooltip> */}
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Filter
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li className='dropstart'>
                                <button className="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" href="#" onClick={(e) => { e?.stopPropagation() }}>Gender</button>
                                <ul className="dropdown-menu">
                                    {genderValues.map(i => {
                                        return <li onClick={()=>uniqueFilterValues(i)}>
                                            <a className="dropdown-item" href="#">{i}</a>
                                        </li>
                                    }
                                    )}
                                </ul>
                            </li>
                            <li className='dropstart'>
                                <button className="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" href="#" onClick={(e) => { e.stopPropagation() }}>Species</button>
                                <ul className="dropdown-menu">
                                    {speciesValues.map(i => {
                                        return <li onClick={""}>
                                            <a className="dropdown-item" href="#">{i}</a>
                                        </li>
                                    }
                                    )}
                                </ul>
                            </li>
                            <li className='dropstart'>
                                <button className="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" href="#" onClick={(e) => { e.stopPropagation() }}>Status</button>
                                <ul className="dropdown-menu">
                                    {statusValues.map(i => {
                                        return <li onClick={""}>
                                            <a className="dropdown-item" href="#">{i}</a>
                                        </li>
                                    }
                                    )}
                                </ul>
                            </li>
                            <li className='dropstart'>
                                <button className="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" href="#" onClick={(e) => { e.stopPropagation() }}>Type</button>
                                <ul className="dropdown-menu">
                                    {typeValues.map(i => {
                                        return <li onClick={""}>
                                            <a className="dropdown-item" href="#">{i}</a>
                                        </li>
                                    }
                                    )}
                                </ul>
                            </li>
                            <li className='dropstart'>
                                <button className="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown" onClick={(e) => { e.stopPropagation() }}>
                                    Location
                                </button>
                                <ul className="dropdown-menu">
                                    <li onClick={""}>
                                        <a className="dropdown-item" href="#">Submenu item 1</a>
                                    </li>
                                    <li className='dropstart'>
                                        <button className="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" href="#" onClick={(e) => { e.stopPropagation() }}>Submenu item 3 &raquo; </button>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li>
                                                <a className="dropdown-item" href="#">Multi level 1</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <div className='d-flex flex-wrap justify-content-center'>
                {
                    getData()?.length ?
                    filterApplied? uniqueFilterValues() : getData()?.map((profile) => {
                            return (
                                <div key={profile.id} className="card" style={{ width: "18rem" }}>
                                    <img src={profile.image} className="card-img-top" alt="OOPS Image is not loaded!!!!!!" />
                                    <div className="card-body">
                                        <Link to={`/characters/${profile.id}`}>
                                            <h2 className="card-title">{profile?.name}</h2>
                                        </Link>
                                        <div className='d-flex'>
                                            <div className="card-title">{profile?.status} - </div>
                                            <div className="card-title">{profile?.species}</div>
                                        </div>
                                        <div><b>Last known location:</b>{profile.location.name}</div>
                                        <p className="card-text"><b>Gender:</b>{profile?.gender}</p>
                                        <p className="card-text"><b>Type:</b>{profile?.type || " - "}</p>
                                        <Link to={`/characters/${profile.id}`}> <button className="btn btn-primary">View Character</button></Link>
                                    </div>
                                </div>
                            )
                        }) : <div>OOPS not Found!!!!!!!!!!!</div>
                }
            </div>
        </div>
    )
}

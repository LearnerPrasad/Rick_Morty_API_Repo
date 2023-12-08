import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Cards(props) {
    const [search, setSearch] = useState('');
    const [charactersProfiles, setCharactersProfiles] = useState([]);
    const [FilterData, setFilterData] = useState([]);
    const [overAllData, setOverAllData] = useState([]);
    const [charactersData, setCharactersData] = useState([]);
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api', {

        })
            .then((response) => {
                setLoaded(true)
                setOverAllData([response.data]);
                setCharactersData([response.data.characters])
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    useEffect(() => {
        axios.get(charactersData, {})
            .then(
                (response) => {
                    setCharactersProfiles(response?.data?.results)
                })
            .catch(
                (error) => {
                    console.log(error)
                })
    }, [loaded])


    return (
        <div className='card p-2 bg-warning text-dark'>
            <div className='d-flex justify-content-end flex-direction-reverse m-2'>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" onChange={(e) => { setSearch(e.target.value) }} placeholder="Search" aria-label="Search" />
                </form>
            </div>
            <div className='d-flex flex-wrap justify-content-center'>
                {
                    charactersProfiles?.filter(i => i?.name?.toLowerCase().includes(search?.toLowerCase()) || i?.gender?.toLowerCase().startsWith(search?.toLowerCase()) || i?.location.name?.toLowerCase().startsWith(search?.toLowerCase()) || i?.status?.toLowerCase().startsWith(search?.toLowerCase()) || i?.type?.toLowerCase().startsWith(search?.toLowerCase()) || i?.species?.toLowerCase().startsWith(search?.toLowerCase())).map((profile) => {
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
                    })
                }
            </div>
        </div>
    )
}

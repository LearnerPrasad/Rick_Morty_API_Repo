import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function DisplayProfile(props) {

    const [character, setCharacter] = useState([]);
    const [overAllData, setOverAllData] = useState([]);
    const [charactersData, setCharactersData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const nav = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api', {

        })
            .then((response) => {
                setLoaded(true)
                setOverAllData([response.data]);
                setCharactersData(response.data.characters)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);
    useEffect(() => {
        axios.get(`${charactersData}/${id}`, {})
            .then(
                (response) => {
                    console.log(response?.data, "res");
                    setCharacter([response?.data])
                })
            .catch(
                (error) => {
                    console.log(error)
                })
    }, [loaded])

    const handleIndex =(ind) =>{
        const string = ind.split("").reverse().join("");
        const index =  ind.split("").reverse().join("").indexOf('/')
        return string.slice(0,index)
    }
    return (
        <div className='d-flex justify-content-center bg-primary bg-gradient'>
            {character?.map(profile => {
                return (<div key={profile.id} className="card d-flex justify-content-center" style={{ width: "fit-content" }}>
                    <img src={profile.image} className="card-img-top" alt="OOPS Image is not loaded!!!!!!" />
                    <div className="card-body">
                        <h2 className="card-title">{profile?.name}</h2>
                        <div className='d-flex'>
                            <div className="card-title">{profile?.status} - </div>
                            <div className="card-title">{profile?.species}</div>
                        </div>
                        <div><b>last Seen  location :</b>{profile.location.name}</div>
                        <div className="card-text"><b>Gender :</b>{profile?.gender}</div>
                        <p className="card-text"><b>Type :</b>{profile?.type || " - "}</p>
                        <p className="card-text"><b>Origin :</b>{profile?.origin.name}</p>
                        {/* <a className="card-text">Current Location:{profile?.origin.url}</a> */}
                        <div><b>{profile?.name} Featured in  :</b></div>
                        <ul>
                            {profile.episode.map(i => {
                                return <li value="episdoe">Episode : {
                                   handleIndex(i)
                                    }
                                    </li>
                            })}
                        </ul>
                        <Link to={'/'}> <button className="btn btn-primary">Back</button></Link>
                    </div>
                </div>)
            })
            }
        </div>
    )
}

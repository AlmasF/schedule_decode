import Search from '../components/search';
import Calendar from '../components/calendar';
import {useEffect, useState} from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config/base-url';

function Result({queryname}){
    const {id} = useParams();
    const [data, setData] = useState([]);
    const getData = () => {
        axios.get(`${BASE_URL}/api/search?${queryname}=${id}`)
        .then(res => {
            setData(res.data);
        });
    }
    
    useEffect(getData, []);

    return (
        <div className='result' >
            <Search flexDirection='row' placeholder='Search by Group, Room, Mentor'/>
            <Calendar data={data}/>
        </div>
    );
}

export default Result;
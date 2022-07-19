import Input from './input';
import logo from '../../assets/logo.png';
import {DatePicker} from 'antd';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../config/base-url';
import axios from 'axios';

function Search(props){
    const inputProps = {...props};
    delete inputProps.flexDirection;
    delete inputProps.filterByWeek;
    delete inputProps.onChangeWeek;

    const [search, setSearch] = useState('');
    const [list, setList] = useState({});

    const onChange = e => {
        setSearch(e.target.value);
        axios.get(`${BASE_URL}/api/search/` + e.target.value)
        .then(res => {
            setList(res.data);
        })
        .catch(
            e => console.log(e)
        );
    }


    return (
        <div className={'search ' + props.flexDirection} >
            <Link to='/'>
                <img src={logo} alt='logo'/>
            </Link>
            <Input {...inputProps} onChange={onChange} value={search} data={list}/>
            {props.filterByWeek && <DatePicker className="week-picker" onChange={props.onChangeWeek} picker="week" placeholder="Неделя"/>}
        </div>
      );
}

export default Search;
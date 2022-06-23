import Input from './input';
import logo from '../../assets/logo.png';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Search(props){
    const inputProps = {...props};
    delete inputProps.flexDirection;
    const [search, setSearch] = useState('');
    const [list, setList] = useState({});

    const onChange = e => {
        setSearch(e.target.value);
        axios.get('http://localhost:3001/api/search/' + e.target.value)
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
        </div>
      );
}

export default Search;
import React from 'react';
import search_icon from '../../assets/search_icon.svg';
import {Col, FormGroup, FormControl} from 'react-bootstrap';

const Search = ({searchChange}) => {
    return(
        
            <FormControl
            style ={{maxWidth:'30%', display:'inline-block'}}
            type="search"
            className="border-none"
            placeholder="Pretraživanje korisnika"
            onChange = {searchChange}
            src ={search_icon}/>
        
    );
}


export default Search;
import React from 'react';
import search_icon from '../../assets/search_icon.svg';
import {Col, FormGroup, FormControl} from 'react-bootstrap';

const Search = ({searchChange}) => {
    return(
        <Col>
            <FormControl 
            type="search"
            placeholder="Pretraživanje korisnika"
            onChange = {searchChange}
            src ={search_icon}/>
        </Col>
    );
}


export default Search;
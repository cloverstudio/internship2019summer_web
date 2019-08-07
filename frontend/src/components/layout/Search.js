import React from 'react';
import search_icon from '../../assets/search_icon.svg';

const Search = ({searchChange}) => {
    return(
        <div>
            <input 
            type="search"
            placeholder="Pretraživanje korisnika"
            onChange = {searchChange}
            src ={search_icon}/>
        </div>
    );
}

export default Search;
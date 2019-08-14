import React from 'react'

const ProfileInfo = ( {name, email, oib, img} ) => {
    
    return(
        <div>
            <img src={img} alt=""/>
            <h2>{name}</h2>
            <p>{email}</p>
             <p>{oib}</p>
            
        </div>
    );
      
}

export default ProfileInfo;
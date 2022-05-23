import React from 'react';
import rootBrandLogo from "../../../../images/myPo/rootbandLogo.png";
import './LastChats.css'

const LastChats = ({lastChat}) => {
    return (


           <div className='lastChatBox'>
               <img className='profileIcon' src={rootBrandLogo} alt="rootBrandLogo"/>
               <div className='chatMain'>
                   <h2 className='profileName text-capitalize'>{lastChat.company_name}</h2>
               </div>
           </div>

    );
};

export default LastChats;
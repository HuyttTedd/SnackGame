import React, {useEffect, useState} from 'react';


const BtnManually = () => {
    function move() {
        return alert('1');
    }
  
  return(
    <button 
        onClick={move}
    >
        Move Manually
    </button>
  )
};

export default BtnManually;
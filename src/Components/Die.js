import React from 'react';
import Dot from '../Components/Dot';

export default function Die(props) {

    function generateDotsArr() {
        const dots = [];
        for (let index = 0; index < props.value; index++) {
           dots.push(<Dot key={index}/>);            
        }
        return dots;
    }
    return (
        <div className={props.active?'die-face active':'die-face'} onClick={props.holdDice}>
           <div className="dot-container" >
            {generateDotsArr()}
           </div>
        </div>
    )
}

// import React from 'react';

// export default function Die(props) {

//      return (
//         <div className={props.active?'die-face active':'die-face'} onClick={props.holdDice}>
//         <h4 className='die-num'>{props.value}</h4>  
//         </div>
//     )
// }
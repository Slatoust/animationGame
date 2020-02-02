import React from "react";


function Square(props) {
    return(
        <div className={props.className} onClick={props.onPress} id={props.id}></div>
    );
}

export default Square;
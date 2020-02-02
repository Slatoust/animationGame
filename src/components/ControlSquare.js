import React from "react";

function ControlSquare(props) {
    return(
        <div id={props.id} className={props.className} onClick={props.onPress}></div>
    );
}

export default ControlSquare;
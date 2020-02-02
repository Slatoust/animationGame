import React from "react";
import ControlSquare from "../components/ControlSquare";

function ControlPanel(props) {
    return(
        <div className="controlPanel">
            <ControlSquare id={1} onPress={props.onPress} className={"controlSquareGameOne"}/>
            <ControlSquare id={2} onPress={props.onPress} className={"controlSquareGameTwo"}/>
            <ControlSquare id={3} onPress={props.onPress} className={"controlSquareGameThree"}/>
        </div>
    );
}

export default ControlPanel;
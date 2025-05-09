import React from "react";
function JustDisplayCard(props){
    return (
        <div className="detailed-card">
            <div className="top">
                <div className="title">
                    <div className="title-content"><h2>{props.title}</h2></div>
                </div>
                <div className="cross">
                    <button onClick={()=>{props.setJustDisplay("none")}}><img src="https://www.svgrepo.com/show/522083/cross-circle.svg" alt="cross svg" /></button>
                </div>
            </div>
            <div className="break"><hr /></div>
            <div className="content">
                <ul>
                    <li>Sample Text</li>
                    <li>Sample Text</li>
                    <li>Sample Text</li>
                </ul>
            </div>
        </div>

    );
}
export default JustDisplayCard;

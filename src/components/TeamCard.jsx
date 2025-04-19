import React, { useState } from "react";
import PersonalCard from "./PersonalCard";
import "../styling/TeamCard.css";
function TeamCard(props){
    return <div className="team-card">
        <div className="heading">
            <h2>{props.team_name} : {props.team_objective}</h2>
        </div>
        <div className="break"><hr /></div>
        <div className="members">
            {(props.team_members).map((element) => 
            <PersonalCard 
                attributes={element}
                setShowWhat={props.setShowWhat} 
                setContent={props.setContent} 
                setIdentification={props.setIdentification}
                setDetails={props.setDetails}
                setOldValues={props.setOldValues}
                setEditPersonalDetails={props.setEditPersonalDetails}
                deleteUser={props.deleteUser}
            />)}
            <div className="button-add">
                <button onClick={()=>props.setShowForm(true)}><img src="https://www.svgrepo.com/show/522230/plus-circle.svg" alt="add team member" /></button>
            </div>
        </div>
        
    </div>
}
export default TeamCard;

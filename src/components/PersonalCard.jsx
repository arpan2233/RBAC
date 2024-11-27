import React from "react"; 
import "../styling/PersonalCard.css"
function PersonalCard(props){
    return <div className="personal-card">
        <div className="name-image-div">
            <div className="name-div"><h3>{props.attributes.member_name}</h3></div>
            <div className="image-div">
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/businessman-icon.png"/>
            </div>
        </div>
        <div className="specifics-div">
                <ul>
                    <li><strong>Position: </strong>{props.attributes.member_position}  </li>
                    <li><strong>ID: </strong>{props.attributes.member_id} </li>
                    <li><strong>Deadline: </strong>{props.attributes.deadline} </li>
                </ul>
        </div>
        <div className="tasks-note-div">
            <button className="tasks" onClick={() => {
                props.setShowWhat("Task Assigned");
                props.setContent(props.attributes.task_assigned);
                props.setIdentification({member_name:props.attributes.member_name, member_id:props.attributes.member_id})
            }}>Task Assigned</button>
            <button className="to-be-noted" onClick={() => {
                props.setShowWhat("To be Noted");
                props.setContent(props.attributes.to_be_noted);
                props.setIdentification({member_name:props.attributes.member_name, member_id:props.attributes.member_id})
                }}>To Be Noted</button>
        </div>
        <div className="edit-delete-button">
            <button onClick={()=>{
                props.setOldValues({
                    Name: props.attributes.member_name, 
                    Position: props.attributes.member_position, 
                    ID: props.attributes.member_id, 
                    Deadline: props.attributes.deadline
                });
                props.setDetails({
                    Name: props.attributes.member_name, 
                    Position:props.attributes.member_position, 
                    ID:props.attributes.member_id, 
                    Deadline:props.attributes.deadline
                });
                props.setEditPersonalDetails(true);
            }} ><img src="https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/pencil-icon.png" alt="Edit" /></button>
            <button onClick={()=>{
                props.setOldValues({
                    Name: props.attributes.member_name, 
                    Position: props.attributes.member_position, 
                    ID: props.attributes.member_id, 
                    Deadline: props.attributes.deadline
                });
                props.deleteUser();
            }} ><img src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/trash-icon.png" alt="Delete" /></button>
        </div>
    </div>
}
export default PersonalCard;
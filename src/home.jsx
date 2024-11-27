import React, { useState } from "react";
import Teams from "./assets/Teamsinfo";
import TeamCard from "./components/TeamCard";
import DetailedCard from "./components/DetailedCard";
import JustDisplayCard from "./components/JustDisplayCard";
import { useMediaQuery } from "react-responsive";
import "./styling/home.css";
function Home(){
    const [showWhat,setShowWhat] = useState("none");
    const [content, setContent] = useState([]);
    const [displayTeam, setDisplayTeam] = useState("none");
    const [showForm, setShowForm] = useState(false);
    const [details, setDetails] = useState({
        Name:"", 
        Position:"", 
        ID:"", 
        Deadline:""
    });
    const [oldValues, setOldValues] = useState({
        Name:"", 
        Position:"", 
        ID:"", 
        Deadline:""
    });
    const [duplicateTeams, setDuplicateTeams] = useState(Teams);
    const [addTeam, setAddTeam] = useState(false);
    const [teamDetails, setTeamDetails] = useState({
        team_name: "",
        objective: "",
        team_members: []
    });
    const [identification, setIdentification] = useState({
        member_name:"",
        member_id:""
    });
    const [editPersonalDetails, setEditPersonalDetails] = useState(false);
    const [editTeamDetails, setEditTeamDetails] = useState(false);
    const [oldTeamDetails, setOldTeamDetails] = useState({
        team_name: "",
        objective: "",
        team_members: []
    });
    const [justDisplay, setJustDisplay] = useState("none");
    function EditTeam(event){
        var tempTeam = duplicateTeams;
        tempTeam.map((element) => {
            if(element.team_name == oldTeamDetails.team_name && element.objective == oldTeamDetails.objective){
                element.team_name = teamDetails.team_name;
                element.objective = teamDetails.objective;
            }
        });
        setDuplicateTeams(tempTeam);
        // Teams = duplicateTeams;
        event.preventDefault();
        setEditTeamDetails(false);
    }
    function deleteTeam(){
        var tempTeam = duplicateTeams;
        var a = tempTeam.filter((element) => {
            return element.team_name != oldTeamDetails.team_name || element.objective != oldTeamDetails.objective;
        });
        tempTeam = a;
        setDuplicateTeams(tempTeam);
    }
    function handleChange(event){
        const {name, value} = event.target;
        setDetails((previousValue) => ({...previousValue,[name]: value}));
    }
    function handleChangedTeam(event){
        const {name, value} = event.target;
        setTeamDetails((previousValue)=> ({...previousValue, [name]:value}));
    }
    function addAnotherTeam(event){
        var tempTeam = duplicateTeams;
        var add = true;
        tempTeam.map(element => {
            if(element.team_name === teamDetails.team_name)add = false;
        })
        if(add) tempTeam.push(teamDetails);
        else alert("Team Already Exist");
        setDuplicateTeams(tempTeam);
        event.preventDefault();
        setAddTeam(false);
    }
    function addMember(event){
        
        var tempTeam = duplicateTeams;
        tempTeam.map((element) => {
            if(element.team_name === displayTeam){
                element.team_members.push({
                    member_name: details.Name,
                    member_position: details.Position,
                    member_id: details.ID,
                    deadline: details.Deadline,
                    task_assigned: [],
                    to_be_noted: []
                })
            }
        });
        setDuplicateTeams(tempTeam);
        // Teams = duplicateTeams;
        event.preventDefault();
        setShowForm(false);
    }
    function changeContent(object){
        const {Index, Value, Title, Delete} = object;
        var tempTeam = duplicateTeams;
        tempTeam.map((element)=>{
            if(displayTeam === element.team_name){
                element.team_members.map((members) =>{
                    if(members.member_id === identification.member_id && members.member_name === identification.member_name){
                        if(Delete){
                            var a = members[Title].filter((listmembers) =>{
                                return listmembers != Value;
                            })
                            members[Title] = a;
                            setContent(members[Title]);
                        } else {
                            members[Title][Index]=Value;
                        }
                    }
                })
            }
        })
        setDuplicateTeams(tempTeam);
    }
    function addContent(to_be_added){
        var tempTeam = duplicateTeams;
        tempTeam.map((element)=>{
            if(displayTeam === element.team_name){
                element.team_members.map((members) =>{
                    if(members.member_id === identification.member_id && members.member_name === identification.member_name){
                        var title = showWhat === "Task Assigned" ? "task_assigned" : "to_be_noted";
                        members[title] = [...members[title], to_be_added];
                        setContent(members[title]);
                    }
                })
            }
        });
        setDuplicateTeams(tempTeam)
    }
    function changeMember(event){
        var tempTeam = duplicateTeams;
        tempTeam.map((element)=>{
            if(displayTeam === element.team_name){
                element.team_members.map((members) =>{
                    if(members.member_id === oldValues.ID && members.member_name === oldValues.Name){
                        members.member_name =  details.Name;
                        members.member_id = details.ID;
                        members.member_position = details.Position;
                        members.deadline = details.Deadline;
                    }
                })
            }
        });
        setDuplicateTeams(tempTeam);
        event.preventDefault();
        setEditPersonalDetails(false);
    }
    function deleteUser(){
        var tempTeam = duplicateTeams;
        tempTeam.map((element)=>{
            if(displayTeam === element.team_name){
                var a = element.team_members.filter((members) =>{
                    return members.member_id != oldValues.ID ;
                })
                element.team_members = a;
            }
        });
        setDuplicateTeams(tempTeam);
        // setEditPersonalDetails(false);
    }
    const isDesktop = useMediaQuery({query: '(min-width: 800px)'});
    const [isShown, setShown] = useState(false);
    return (
        <div className="home-page">
            {(isDesktop || isShown) && <div className="navigate">
                <div className="personal-div">
                    <div className="name-img-div">
                        <div className="img"><img src="" alt="" /></div>
                        <div className="name-div"><h2>Name</h2></div>
                        {(!isDesktop && isShown) && <div className="cross">
                            <img onClick={()=>setShown(false)} src="https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/close-line-icon.svg" alt="" />
                        </div>}
                    </div>
                    <div className="my-info-div">
                        <p onClick={()=>setJustDisplay("My Information")}>My Info</p>
                    </div>
                </div>
                <div className="break"><hr /></div>
                <div className="team-name-div">
                    <div className="Teams-and-Add">
                        <div className="Teams"><h3>Teams</h3></div>
                        <button onClick={()=>setAddTeam(true)}><img src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/add-round-white-icon.svg" alt="" /></button>
                    </div>
                    <div className="team-list">
                        <ul>
                            {duplicateTeams.map((element)=> 
                            <li onClick={() => {setDisplayTeam(element.team_name)}}>
                                <div className="text">{element.team_name}</div>
                                <div className="edit-delete-div">
                                    <button onClick={()=>{
                                        setEditTeamDetails(true);
                                        setOldTeamDetails ({
                                            team_name: element.team_name,
                                            objective: element.objective,
                                            team_members: element.team_members
                                        });
                                        setTeamDetails(oldTeamDetails);
                                        }} ><img src="https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/pencil-icon.png" alt="Edit" /></button>
                                    <button onClick={()=>{
                                        setOldTeamDetails ({
                                            team_name: element.team_name,
                                            objective: element.objective,
                                            team_members: element.team_members
                                        });
                                        deleteTeam();
                                    }} ><img src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/trash-icon.png" alt="Delete" /></button>
                                </div>
                            </li>)}
                        </ul>
                    </div>
                </div>
            </div>}
            {!isShown && !isDesktop && 
                <div className="collapsed-pane">
                    <img onClick={()=>{
                        setShown(true)
                    }} src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/home-button-white-icon.svg" alt="" />
                </div>
            }
            <div className="expanded-view">
                <div className="upper">
                    <h4 onClick={()=>setJustDisplay("My Tasks")}>My Tasks</h4>
                    <h4 onClick={()=>setJustDisplay("Guidlines")}>Guidlines</h4>
                </div>
                <div className="lower">
                    {duplicateTeams.map((element) => {
                    if(displayTeam === element.team_name){
                        return <TeamCard
                                    team_name={displayTeam}
                                    team_objective={element.objective}
                                    team_members={element.team_members}
                                    setShowWhat={setShowWhat}
                                    setContent={setContent}
                                    setShowForm={setShowForm}
                                    setIdentification={setIdentification} 
                                    setOldValues={setOldValues}
                                    setDetails={setDetails}
                                    setEditPersonalDetails={setEditPersonalDetails}
                                    deleteUser={deleteUser}
                                />}
                                   
                                
                            })
                    }
                    {(showWhat !== "none") && 
                    <DetailedCard 
                        content={content} 
                        title={showWhat} 
                        setShowWhat={setShowWhat}
                        changeContent={changeContent}
                        addContent={addContent}
                    />}
                    {(showForm) &&
                        <div className="form"> 
                            <div className="title">
                                <h3>Add Member Details</h3>
                                <img onClick={()=>setShowForm(false)} src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/remove-close-round-icon.png" alt="cross" />
                            </div>
                            <div className="break"><hr /></div>
                            <form action="Add" onSubmit={addMember}>
                                <div className="name-field">
                                    <label name="Name">Name: </label>
                                    <input name="Name" type="text" placeholder="Add Name" value={details.Name} onChange={handleChange} />
                                </div>
                                <div className="position-field">
                                    <label name="Position">Position: </label>
                                    <input name="Position" type="text" placeholder="Add Position" value={details.Position} onChange={handleChange} />
                                </div>
                                <div className="ID-field">
                                    <label name="ID">ID: </label>
                                    <input name="ID" type="text" placeholder="Add ID" value={details.ID} onChange={handleChange} />
                                </div>
                                <div className="deadline-field">
                                    <label name="Deadline">Deadline: </label>
                                    <input name="Deadline" type="text" placeholder="Add Deadline" value={details.Deadline} onChange={handleChange} />
                                </div>
                                <div className="add-button">
                                    <button type="Add" >ADD</button>
                                </div>
                            </form>
                        </div>
                    }
                    {addTeam && 
                        <div className="form">
                            <div className="title">
                                <h3>Add Team Details</h3>
                                <img onClick={()=>setAddTeam(false)} src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/remove-close-round-icon.png" alt="cross" />
                            </div>
                            <div className="break"><hr /></div>
                            <form action="Add" onSubmit={addAnotherTeam}>
                                <div className="name-field">
                                    <label name="team_name">Team Name: </label>
                                    <input name="team_name" type="text" placeholder="Add Team Name" value={teamDetails.team_name} onChange={handleChangedTeam} />
                                </div>
                                <div className="position-field">
                                    <label name="objective">Objective: </label>
                                    <input name="objective" type="text" placeholder="Add objective" value={teamDetails.objective} onChange={handleChangedTeam} />
                                </div>
                                <div className="add-button">
                                    <button type="Add" >ADD</button>
                                </div>
                            </form>
                        </div>
                    }
                    {editPersonalDetails &&
                        <div className="form"> 
                            <div className="title">
                                <h3>Edit Member Details</h3>
                                <img onClick={()=>setEditPersonalDetails(false)} src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/remove-close-round-icon.png" alt="cross" />
                            </div>
                            <div className="break"><hr /></div>
                            <form action="Save" onSubmit={changeMember}>
                                <div className="name-field">
                                    <label name="Name">Name: </label>
                                    <input name="Name" type="text" placeholder="Add Name" value={details.Name} onChange={handleChange} />
                                </div>
                                <div className="position-field">
                                    <label name="Position">Position: </label>
                                    <input name="Position" type="text" placeholder="Add Position" value={details.Position} onChange={handleChange} />
                                </div>
                                <div className="ID-field">
                                    <label name="ID">ID: </label>
                                    <input name="ID" type="text" placeholder="Add ID" value={details.ID} onChange={handleChange} />
                                </div>
                                <div className="deadline-field">
                                    <label name="Deadline">Deadline: </label>
                                    <input name="Deadline" type="text" placeholder="Add Deadline" value={details.Deadline} onChange={handleChange} />
                                </div>
                                <div className="add-button">
                                    <button type="Save">SAVE</button>
                                </div>
                            </form>
                        </div>
                    }
                    {editTeamDetails && 
                        <div className="form">
                        <div className="title">
                            <h3>Edit Team Details</h3>
                            <img onClick={()=>setEditTeamDetails(false)} src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/remove-close-round-icon.png" alt="cross" />
                        </div>
                        <div className="break"><hr /></div>
                        <form action="Save" onSubmit={EditTeam}>
                            <div className="name-field">
                                <label name="team_name">Team Name: </label>
                                <input name="team_name" type="text" placeholder="Add Team Name" value={teamDetails.team_name} onChange={handleChangedTeam} />
                            </div>
                            <div className="position-field">
                                <label name="objective">Objective: </label>
                                <input name="objective" type="text" placeholder="Add objective" value={teamDetails.objective} onChange={handleChangedTeam} />
                            </div>
                            <div className="add-button">
                                <button type="Save" >SAVE</button>
                            </div>
                        </form>
                    </div>
                    }
                    {(justDisplay === "My Tasks" || justDisplay === "Guidlines" || justDisplay === "My Information")   
                    && <JustDisplayCard title={justDisplay} setJustDisplay={setJustDisplay}/>}                   
                </div>
            </div>
        </div>
    );
}
export default Home;

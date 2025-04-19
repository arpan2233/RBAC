import React, { useState } from "react";
import "../styling/DetailedCard.css"
function DetailedCard(props){
    const [changeIndex,setChangeIndex] = useState(-1);
    const [inputValue, setInputValue] = useState("");
    const [toAdd, setToAdd] = useState(false);
    function changeFunction(event){
        const {value} = event.target;
        setInputValue(value);        
    }
    return (
        <div className="detailed-card">
            <div className="top">
                <div className="title">
                    <div className="title-content"><h2>{props.title}</h2></div>
                    <div className="button-add">
                        <button onClick={()=>setToAdd(true)}><img src="https://www.svgrepo.com/show/40113/plus.svg" alt="add team member" /></button>
                    </div>
                </div>
                <div className="cross">
                    <button onClick={()=>{props.setShowWhat("none")}}><img src="https://www.svgrepo.com/show/522083/cross-circle.svg" alt="cross svg" /></button>
                </div>
            </div>
            <div className="break"><hr /></div>
            <div className="content">
                <ul>
                    {props.content.map((element,index) =>  
                    <li>
                        {(changeIndex != index) ? 
                            <div className="text">{element}</div> : 
                            <div className="input-div">
                                <input type="text" name="edited" value={inputValue} onChange={changeFunction}/>
                                <button className="save" onClick={() => {
                                    setChangeIndex(-1);
                                    props.changeContent({
                                        Index: index,
                                        Value: inputValue,
                                        Title: (props.title === "Task Assigned") ? "task_assigned" : "to_be_noted",
                                        Delete: false
                                    });
                                }}>Save</button>
                            </div>
                            }
                        <div className="edit-delete-div">
                            <button onClick={()=>{
                                    setInputValue(element);
                                    setChangeIndex(index);
                                }}><img src="https://www.svgrepo.com/show/535558/pencil.svg" alt="Edit" /></button>
                            <button onClick={()=>{
                                setInputValue(element);
                                setChangeIndex(-1);
                                props.changeContent({
                                    Index: index,
                                    Value: element,
                                    Title: (props.title === "Task Assigned") ? "task_assigned" : "to_be_noted",
                                    Delete: true
                                })
                            }}><img src="https://www.svgrepo.com/show/490436/trash-can.svg" alt="Delete" /></button>
                        </div>
                    </li>)}
                </ul>
                {toAdd && 
                    <div className="add-div">
                        <input type="text" placeholder="Type Here" value={inputValue} onChange={changeFunction}/>
                        <button className="save-button" onClick={() => {
                            props.addContent(inputValue);
                            setToAdd(false);
                        }}>Save</button>
                        <button className="cross-button" onClick={() =>{
                            setToAdd(false);
                        }}><img src="https://www.svgrepo.com/show/522083/cross-circle.svg" alt="cross icon" /></button>
                    </div>
                }
            </div>
        </div>
    );
}
export default DetailedCard;

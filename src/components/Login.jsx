import React, { useState } from "react";
import '../styling/Login.css'
function Login(){
    return (
        <div className="login-page">
            <div className="background-div"></div>
            <div className="login-card">
                <div className="content-div">
                    <div className="first">
                        <h1>Login</h1>
                    </div>
                    <div className="second">
                        <form action="Submit">
                            <div className="field-one">
                                <label name="login-as">Login As: </label>
                                <select name="login-as" >
                                    <option>Admin 1</option>
                                    <option>Admin 2</option>
                                    <option>Developer</option>
                                </select>
                            </div>
                            <div className="field-two">
                                <label name="email-id">Email ID</label>
                                <input type="text" name="email-id"/>
                            </div>
                            <div className="field-three">
                                <label name="password">Password</label>
                                <input type="password" name="password"/>
                            </div>
                            <div className="field-four">
                                <button type="Submit">Submit</button>
                            </div>
                        </form>
                    </div>
                    <hr/>
                    <div className="third">
                        <h2>Google</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;
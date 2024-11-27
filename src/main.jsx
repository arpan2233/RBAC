import React from "react";
import ReactDOM from "react-dom/client" 
import App from "./components/App";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./home";
ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<App/>} />
            <Route path="/submit" element={<Home/>} />
            <Route path="/Add" element={<Home/>} />
        </Routes>
    </BrowserRouter>
);

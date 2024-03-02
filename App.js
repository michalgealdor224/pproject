import './App.css';
import React from "react";
import HomePage from "./HomePage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


class App extends React.Component{
    render() {
        return (
            <div className="App" >
                <Router>
                    <Routes>
                        <Route path = {"/"} element ={<HomePage />} />
                    </Routes>
                </Router>

            </div>
        );
    }

}

export default App;
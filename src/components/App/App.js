import React from 'react';
import './App.css'
import Game from "../Game/Game";
import {Route, Switch} from "react-router-dom";
import Settings from "../Settings/Settings";
import Leaders from "../Leaders/Leaders";

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route path={'/'} exact component={Settings}/>
                <Route path={'/game'} component={Game} computer={true}/>
                <Route path={'/leaders'} component={Leaders}/>
            </Switch>
        </div>
    );
}


export default App;

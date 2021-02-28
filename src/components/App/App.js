import React from 'react';
import './App.css'
import Game from "../Game/Game";
import {Route, Switch} from "react-router-dom";
import Settings from "../Settings/Settings";
import Leaders from "../Leaders/Leaders";
import logo from "../../assets/img/rs_school_js.svg";
import music from '../../assets/music/03-b-type-music.mp3'

const App = () => {
    return (
        <div className="App">
            <header>
                <audio
                    loop={true}
                    preload={'auto'}
                    controls
                    src={music}
                >
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
            </header>
            <Switch>
                <Route path={'/'} exact component={Settings}/>
                <Route path={'/game'} component={Game} computer={true}/>
                <Route path={'/leaders'} component={Leaders}/>
            </Switch>
            <footer>
                <a href="https://github.com/slavaider">github</a>
                <img src={logo} alt="img"/>
                <a href="https://rs.school/js/">rs-school</a>
            </footer>
        </div>
    );
}


export default App;

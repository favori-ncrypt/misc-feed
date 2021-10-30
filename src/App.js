import React from 'react';
import { BrowserRouter as Router ,Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Game from "./components/Game/Game";
import Calculator from './components/Calculator/Calculator';
import Feed from './components/Feed/Feed';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/game"><Game/></Route>
                <Route exact path="/calculator"><Calculator/></Route>
                <Route exact path="/feed"><Feed pageSize={100}/></Route>
            </Switch>
        </Router>
    );
}

export default App;
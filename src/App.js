import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Home from "./component/Home";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Switch>
                    <Route exact path={'/'} render={() => {
                        return <Redirect to={'/launches'}/>
                    }}/>
                    <Route exact path={'/launches'} component={Home}/>
                </Switch>
            </React.Fragment>
        </BrowserRouter>
    );
  }
}

export default App;

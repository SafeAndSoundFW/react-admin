import React from 'react'
import { HashRouter as Router, Route, Link,Switch} from 'react-router-dom'
import Main from './Main'
import Info from './info'
import About from './../route1/about'
import Topic from './../route1/topic'
import Home from './Home'
import NoMatch from './noMatch'
export default class IRoute extends React.Component{
    render() {
        return (
            <Router>
                <Home>
                    <Switch>
                        <Route path="/main" render={() => 
                            <Main>
                                <Route path="/main/:value" component={Info}></Route>
                            </Main>
                        }>
                        </Route>
                        <Route path="/about" component={About}></Route>
                        <Route path="/topic" component={Topic}></Route> 
                        <Route path="/imooc1" component={NoMatch}></Route> 
                        <Route path="/imooc2" component={NoMatch}></Route> 
                    </Switch>
                </Home>
            </Router>
        )
    }
}
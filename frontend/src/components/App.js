import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import Signup from './Signup'
import Login from './Login'
import Homepage from './Homepage'

// const socket = socketIOClient.connect()

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route path='/signup'>
                    <Signup />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
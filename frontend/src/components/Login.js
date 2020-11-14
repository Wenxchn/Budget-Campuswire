import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const login = async () => {
        try {
            await axios.post('/account/login', { username, password })
            history.push('/')
        } catch (e) {
            console.log(e)
            Window.alert('Failed to login')
        }
    }

    return (
        <div className='ml-2'>
            <h1 className='text-primary'>Log In</h1>
            <Form>
                <Form.Group controlId='formUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type='username' 
                        placeholder='Enter Username'
                        onChange={e => setUsername(e.target.value)}
                        style={{ width: '500px' }}
                    />
                </Form.Group>
                <Form.Group controlId='formPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Password'
                        onChange={e => setPassword(e.target.value)}
                        style={{ width: '500px' }}
                    />
                </Form.Group>
            </Form>
            <Button
                onClick={() => login()}
            > Log In 
            </Button>
            &nbsp;Don't have an account?
            <Link to="/signup"> Sign up here!</Link>
        </div>
    )
}

export default Login
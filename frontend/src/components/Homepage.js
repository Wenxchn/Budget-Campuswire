import React, {useEffect, useState} from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useHistory } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import QuestionList from './QuestionList'
import axios from 'axios'

const socket = socketIOClient.connect()

const logout = async () => {
    try {
        await axios.post('./account/logout')
    } catch (e) {
        console.log(e)
    }
}

const Homepage = () => {
    const [username, setUsername] = useState('')
    const history = useHistory()
    
    useEffect(async () => {
        try {
            let response = await axios.post('/isAuthenticated')
            let { user } = response.data
            setUsername(user)
        } catch (e) {
            console.log(e)
        }
    })

    useEffect(() => {
        const intervalID = setInterval(() => {

        }, 2000)
        return () => clearInterval(intervalID)
      }, [])

    if (username !== '') {
        return (
            <div className='ml-2 mr-2'>
                <Row>
                    <Col>
                        <h1 className='text-primary'>Campuswire Lite</h1>
                    </Col>
                    <Col className='text-right'>
                        Username: {username} &nbsp;
                        <Button className='float-right' onClick={() => logout()}>Logout</Button>
                    </Col>
                </Row>
                    <Button className=''style={{ width: '486px' }}> Add new question </Button>
                <QuestionList/>
            </div>
        )
    } else {
        return (
            <div className='ml-2 mr-2'>
                <h1 className='text-primary'>Campuswire Lite</h1>
                <Button style={{ width: '486px' }} onClick={() => history.push('/login')}> Login to ask a question </Button>
                <QuestionList/>
            </div>
        )
    }
}

export default Homepage

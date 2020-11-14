import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useHistory } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import QuestionList from './QuestionList'

const socket = socketIOClient.connect()

const Homepage = () => {
    const history = useHistory()

    return (
        <div className='ml-2 mr-2'>
            <h1 className='text-primary'>Campuswire Lite</h1>
            <Button  style={{ width: '486px' }} onClick={() => history.push('/login')}> Login to ask a question </Button>
            <QuestionList/>
        </div>
    )
}

export default Homepage

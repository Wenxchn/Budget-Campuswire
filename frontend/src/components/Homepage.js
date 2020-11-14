import React, {useEffect, useState} from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useHistory } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import QuestionList from './QuestionList'
import axios from 'axios'

const socket = socketIOClient.connect()

const Homepage = () => {
    const [username, setUsername] = useState('')
    const [isOpen, setIsOpen] = useState(false)
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

    const logout = async () => {
        try {
            await axios.post('./account/logout')
            setUsername('')
        } catch (e) {
            console.log(e)
        }
    }

    const addQuestion = async () => {
        try {
            await axios.post('./api/questions/add', { questionText, username})
        } catch (e) {
            console.log(e)
        }
    }

    if (username !== '') {
        return (
            <div className='ml-2 mr-2'>
                <Row>
                    <Col>
                        <h1 className='text-primary'>Campuswire Lite</h1>
                    </Col>
                    <Col className='text-right'>
                        Username: {username} &nbsp;
                        <Button className='float-right' onClick={() => logout()}>Log out</Button>
                    </Col>
                </Row>
                <Button className=''style={{ width: '486px' }} onClick={() => setIsOpen(true)}> Add new question </Button>
                <QuestionList/>
                <Modal show={isOpen}>
                    <Modal.Body>
                        Add Question:
                        <Form>
                            <Form.Control as="textarea" rows={3}>
                            </Form.Control>
                        </Form>
                        <Button block>Submit</Button>
                        <Button block variant='light' onClick={() => setIsOpen(false)}>Close</Button>
                    </Modal.Body>
                </Modal>
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

import React, {useEffect, useState} from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useHistory } from 'react-router-dom'
// import socketIOClient from 'socket.io-client'
import QuestionList from './QuestionList'
import axios from 'axios'

// Better method to update
// const socket = socketIOClient.connect()

const Homepage = () => {
    let questionText, questionText2, answerText, authorText
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
            await axios.post('./api/questions/add', { questionText: questionText.value, author: username })
        } catch (e) {
            console.log(e)
        }
    }

    const answerQuestion = async () => {
        try {
            await axios.post('./api/questions/answer', { questionText: questionText2.value, author: authorText.value, answer: answerText.value})
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
                <Modal show={isOpen} onHide={() => setIsOpen(false)}>
                    <Modal.Body>
                        Add new question 
                        <Form onSubmit={e => {
                            e.preventDefault()
                            addQuestion()
                            setIsOpen(false)
                        }}>
                            <Form.Control as="textarea" rows={3} ref={node => questionText = node}></Form.Control>
                            <Button block type='submit'>Submit</Button>
                            <Button block variant='light' onClick={() => setIsOpen(false)}>Close</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Row>
                    <Col sm='4'></Col>
                    <Col>
                        <Card className='border-0'>
                            <Card.Body>
                                <Card.Text>Answer a question. Just copy and paste the question and author before answering!</Card.Text>
                                <Form onSubmit={e => {
                                    e.preventDefault()
                                    answerQuestion()
                                }}>
                                    <Form.Label>Question</Form.Label>
                                    <Form.Control placeholder='Enter Question' ref={node => questionText2 = node}></Form.Control>
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control placeholder='Enter Author' ref={node => authorText = node}></Form.Control>
                                    <Form.Label>Answer</Form.Label>
                                    <Form.Control placeholder='Enter Answer' as="textarea" rows={3} ref={node => answerText = node}></Form.Control>
                                    <Button block type='submit'>Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card> 
                    </Col>
                </Row>
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

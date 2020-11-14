import React from 'react' 
import axios from 'axios'
import { Button, Row, Card, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class QuestionList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {questionText: '', author: '', answer: '', textAuthor: '', textAnswer: ''}
    }

    componentDidMount() {
        this.renderQuestions()
    }

    async showQuestionDetails(e) {
        let data = e.target.value.split('ñæÆÆññæÆÆñ')
        let questionText = data[0]
        let author = data[1]
        let answer = data[2]
        this.setState({questionText: questionText, author: author, answer: answer, textAuthor: 'Author:', textAnswer: 'Answer:'})
    }
    
    renderQuestions = async () => {
        try {
            let response = await axios.get('/api/questions')
            let questions = response.data
            this.setState({
                Questions: questions.map((question, i) => (
                <Button 
                        block className="btn btn-light text-left" 
                        value={
                            question.answer === undefined ? 
                            question.questionText + 'ñæÆÆññæÆÆñ' + question.author + 'ñæÆÆññæÆÆñ' + '' : 
                            question.questionText + 'ñæÆÆññæÆÆñ' + question.author + 'ñæÆÆññæÆÆñ' + question.answer} 
                        onClick={e => this.showQuestionDetails(e)} 
                        key={i}>{question.questionText}
                </Button>
                ))
              })  
        } catch (e) {
            console.log(e)
        }
    }
    
    render() {
        return (
            <>
                <Row>
                    <Col sm='4' className='border border-light'>
                        {this.state.Questions}
                    </Col>
                    <Col className='border border-light'>
                        <Card className='border-0'>
                            <Card.Title>
                                {this.state.questionText}
                            </Card.Title>
                            <Card.Body>
                                <Card.Text className='font-weight-bold'>
                                    {this.state.textAuthor}
                                </Card.Text>
                                <Card.Text>
                                    {this.state.author}
                                </Card.Text>
                                <Card.Text className='font-weight-bold'>
                                    {this.state.textAnswer}
                                </Card.Text>
                                <Card.Text>
                                    {this.state.answer}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
        )
    }
}

export default QuestionList
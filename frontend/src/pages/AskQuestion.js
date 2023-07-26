import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { TokenService } from '../services/TokenService'

function AskQuestion() {
  const decodedToken = TokenService.decodeToken(TokenService.getToken());
  const [themes, setThemes] = useState ([])
  const [question, setQuestion] = useState ({})
  const [answer, setAnswer] = useState('')
  const [previousAnswer, setPreviousAnswer] = useState([])

  useEffect((() => {
    axios.get('http://localhost:8000/api/themes')
    .then(res => {
      setThemes(res.data)
    })
    .catch(error => {
       console.log(error)
    })
  }),[])

  useEffect((() => {
    axios.get(`http://localhost:8000/api/user/questions/${decodedToken.user_id}`)
    .then(res => {
      setPreviousAnswer(res.data)
    })
    .catch(error => {
      console.log(error)
    })
  }),[])

  const changeOptionsHandler = (e) => {
    const index = e.target.selectedIndex
    const el = e.target.childNodes[index]
    const option = el.getAttribute('id')
    setQuestion({...question, id_theme : option})
  }

  const sendQuestion = () =>
  {
    axios.post('http://localhost:8000/api/answer', 
    {
      id_user : decodedToken.user_id,
      id_thema : parseInt(question.id_theme),
      content : question.content
    },
    {
      headers : {
       Authorization : `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      setAnswer(res.data.content)
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div>
      <div style = {{width: '50%', marginRight: '100px', paddingTop: '30px', float: 'right'}}>
        <h3>Previous questions and answers</h3>
        <TableContainer>
        <Table variant='striped' colorScheme='teal'>
        <TableCaption>Questions and answers</TableCaption>
          <Thead>
            <Tr>
              <Th>Theme</Th>
              <Th>Question</Th>
              <Th>Answer</Th>
            </Tr>
          </Thead>
          <Tbody>
            {previousAnswer.map(prevAns => 
            <Tr key = {prevAns.question.id}>
              <Td>{prevAns.question.theme.name}</Td>
              <Td>{prevAns.question.content}</Td>
              <Td>{prevAns.content}</Td>
            </Tr>
            )}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Theme</Th>
              <Th>Question</Th>
              <Th>Answer</Th>
            </Tr>
          </Tfoot>
        </Table>
        </TableContainer>
      </div>
      <div style = {{width: '25%', marginLeft: '20px', paddingTop: '30px', float: 'left'}}>
        <h3> Choose theme</h3>
        <form>
          <select className="form-select" aria-label="Default select example" onChange={changeOptionsHandler}>
            <option selected>Choose theme</option>
              {themes.map(theme => 
                <option id = {theme.id}>{theme.name}</option>
              )}
          </select>
        </form>
      </div>
      <div style = {{width: '25%', marginLeft: '20px', paddingTop: '150px'}}> 
        <div className="form-floating" >
            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" value = {question.content} onChange = {e => setQuestion({...question, content : e.target.value})}></textarea>
            <label htmlFor="floatingTextarea">Enter a question</label>
        </div>
      </div>
      <div style = {{width: '25%', marginLeft: '20px', paddingTop: '50px'}}>
        <button type="button" className="btn btn-primary" onClick={sendQuestion}>Send</button>
      </div>
        <div style = {{width: '25%', marginLeft: '20px', paddingTop: '30px'}}>
          <p style={{textAlign:'center'}}>{answer}</p>
        </div> 
    </div>
  )
}

export default AskQuestion
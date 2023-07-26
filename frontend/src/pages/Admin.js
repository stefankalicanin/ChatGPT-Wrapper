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
import {React, useState, useEffect} from 'react'
import axios from 'axios'
function Admin() {
    const [user, setUser] = useState([])
    const [answer, setAnswer] = useState([])

    useEffect((() => {
        axios.get('http://localhost:8000/api/users')
        .then(res => {
          setUser(res.data)
        })
      }),[])

    const userQuestion = (e) =>  {
      const index = e.target.selectedIndex
      const el = e.target.childNodes[index]
      const option = el.getAttribute('id')
        axios.get(`http://localhost:8000/api/user/questions/${option}`)
        .then(res => {
            setAnswer(res.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

  return (
    <div style={{width: '50%', marginTop: '100px', marginLeft: '350px'}}>
      <div>
       <form>
        <select className="form-select" aria-label="Default select example" onChange={userQuestion}>
          <option selected>Choose user</option>
          {user.map(u => 
              <option id = {u.id}>{u.username}</option>
          )}
        </select>
        </form>
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
              {answer.map(prevAns => 
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
      </div>
  )
}

export default Admin
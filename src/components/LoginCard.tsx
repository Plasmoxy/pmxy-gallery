import React, { ReactElement, useState } from 'react'
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap'
import * as userService from '../services/user.service'

interface Props {
  
}

export default function LoginCard({}: Props): ReactElement {
  
  const [err, setErr] = useState("")
  
  return (
    <Card className="p-4">
      
      <h1>PRIHLÁSIŤ SA</h1>
      
      <InputGroup className="mb-3 mt-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Meno</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Heslo</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl type="password"/>
      </InputGroup>
      
      <div className="d-flex flex-row justify-content-end">
        <Button variant="secondary">Prihlásiť sa</Button>
      </div>
      
      {err !== "" ? <p className="text-danger">{err}</p> : null}
    </Card>
  )
}

import React, { ReactElement, useState } from 'react'
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap'
import { useStore } from '../model/Store'
import * as userService from '../services/user.service'

interface Props {
  
}

export default function LoginCard({}: Props): ReactElement {
  
  const [err, setErr] = useState("")
  const uname = useStore(s => s.uname)
  const upass = useStore(s => s.upass)
  const update = useStore(s => s.update)
  
  return (
    <Card className="p-4">
      
      <h1>PRIHLÁSIŤ SA</h1>
      
      <InputGroup className="mb-3 mt-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Meno</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl onChange={e => update(s => {s.uname = e.target.value})} value={uname} />
      </InputGroup>
      
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Heslo</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl type="password" onChange={e => update(s => {s.upass = e.target.value})} value={upass} />
      </InputGroup>
      
      <div className="d-flex flex-row justify-content-end">
        <Button variant="secondary">Prihlásiť sa</Button>
      </div>
      
      {err !== "" ? <p className="text-danger">{err}</p> : null}
    </Card>
  )
}

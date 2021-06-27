import React, { ReactElement, useState } from 'react'
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap'
import { useStore } from '../model/Store'
import * as userService from '../services/user.service'

interface Props {
  closeParent?: () => void,
}

export default function LoginCard({closeParent}: Props): ReactElement {
  
  const [err, setErr] = useState("")
  const uname = useStore(s => s.auth.username)
  const upass = useStore(s => s.auth.password)
  const update = useStore(s => s.update)
  
  async function login() {
    try {
      await userService.auth()
      if (closeParent) closeParent()
      update(s => {
        s.displayName = s.auth.username
      })
    } catch({response}) {
      if (response.status === 401) {
        setErr("Nesprávne meno alebo heslo!")
      } else {
        setErr("Neznáma chyba!")
      }
      update(s => {
        s.auth.username = ""
        s.auth.password = ""
        s.displayName = ""
      })
    }
  }
  
  return (
    <Card className="p-4">
      
      <h1>PRIHLÁSIŤ SA</h1>
      
      <InputGroup className="mb-3 mt-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Meno</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl onChange={e => update(s => {s.auth.username = e.target.value})} value={uname} />
      </InputGroup>
      
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Heslo</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl type="password" onChange={e => update(s => {s.auth.password = e.target.value})} value={upass} />
      </InputGroup>
      
      <div className="d-flex flex-row justify-content-end">
        <Button variant="secondary" onClick={login}>Prihlásiť sa</Button>
      </div>
      
      {err !== "" ? <p className="text-danger">{err}</p> : null}
    </Card>
  )
}

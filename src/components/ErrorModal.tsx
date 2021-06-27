import React, {useState} from 'react'
import { Card } from 'react-bootstrap'
import { useStore } from '../model/Store'
import { AppModal } from './AppModal'

export function ErrorModal(props: {}) {
  const errorModals = useStore(s => s.errorModals)
  const update = useStore(s => s.update)
  
  const [msg, setMsg] = useState("") // intermediate msg
  
  if (errorModals.length > 0 && msg !== errorModals[0]) {
    setMsg(errorModals[0])
  }
  
  return <AppModal
      width={500}
      open={errorModals.length > 0}
      onExited={() => {}}
      onClosed={() => update(
        s => {s.errorModals.pop()}
      )}>
    <Card className="p-4">
      <h1 className="text-danger">Chyba!</h1>
      <div className="my-2">
        {msg}
      </div>
    </Card>
  </AppModal>
}
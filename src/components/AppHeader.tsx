import React, { ReactElement } from 'react'
import cameraSvg from '../icons/camera.svg'
import { useStore } from '../model/Store'
import { Button } from 'react-bootstrap'

interface Props {
  showLoginModal: () => void,
}

export default function AppHeader({showLoginModal}: Props): ReactElement {
  
  const uname = useStore(s => s.uname)
  
  return (
    <div className="d-flex flex-row">
        
    <div className="d-flex flex-row flex-grow-1 text-light">
      <img className="mt-auto mb-auto pr-3" src={cameraSvg} />
      <h1 className="mt-auto mb-auto">PMXY GALLERY</h1>
    </div>
    
    <div className="d-flex flex-row flex-grow-1 justify-content-end">
      <a href="https://github.com/Plasmoxy/pmxy-gallery" className="text-light mx-5 mt-auto mb-auto">Source code</a>
      <Button variant="secondary" onClick={showLoginModal}>{uname=="" ? "Prihlásiť sa" : uname}</Button>
    </div>
  </div>
  )
}

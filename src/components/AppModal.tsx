import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useModal } from 'react-modal-hook'
import './AppModal.scss'
import closeSvg from '../icons/close.svg'

interface Props {
  open: boolean
  onClosed: () => any
  width?: number | string
  onExited?: () => any
  closeButtonStyle?: any
}

// Modal component with support for TransitionGroup
export const AppModal: React.FC<Props> = ({
  open, children, onExited, onClosed, width, closeButtonStyle
}) => {

  const root = useRef<any>()
  const close = () => {
    if (onClosed) onClosed()
  }
  const click = (e: any) => {
    // if outside the content
    if (e.target == root.current) close()
  }
  
  return <CSSTransition
    in={open}
    timeout={250}
    unmountOnExit
    classNames="transition-modal"
    onExited={onExited}
  >
    <div className="app-modal" ref={root} onClick={click}>
      <div className="app-modal-content" style={{width: width ?? 600}}>
        <div onClick={close} className="d-flex justify-content-end">
          <span style={closeButtonStyle} className="app-modal-close-btn">
            <img  className="mx-2" src={closeSvg} width="22" height="22" />
            ZAVRIEŤ
          </span>
        </div>
        {children}
      </div>
    </div>
  </CSSTransition>
}

// custom modal hook for ez use
export const useAppModal = (contentFn: () => JSX.Element, onClose?: () => any, width?: number) => {
  const [show, hide] = useModal(({in: open, onExited}) => {
    const onModalClosed = () => {
      if (onClose) onClose()
      hide()
    }
    return <AppModal width={width} open={open} onExited={onExited} onClosed={onModalClosed}>
      {contentFn()}
    </AppModal>
  })
  
  return [show, hide]
}
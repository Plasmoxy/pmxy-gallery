import React, {useState} from 'react'
import { useStore } from '../model/Store'
import { AppModal } from './AppModal'

export function ErrorModal(props: {}) {
  const errorModal = useStore(s => s.errorModal)
  const update = useStore(s => s.update)
  
  return <AppModal
      width={500}
      open={errorModal !== ""}
      onExited={() => {}}
      onClosed={() => update(
        s => {s.errorModal = ""}
      )}>
    <div className="text-white">
      {errorModal}
    </div>
  </AppModal>
}
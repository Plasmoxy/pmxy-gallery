import React from 'react'
import "./PhotoCard.scss"
import deletIcon from '../icons/delete.svg'

interface Props {
  image: string
  onClick?: () => any
  onDelete?: () => any
}

export const PhotoCard: React.FC<Props> = ({
  image, onClick, onDelete
}) => {
  
  return <div className="photo-card-wrapper m-2">
    <img className="deleteIcon" src={deletIcon} onClick={e => {
      if (onDelete) onDelete()
      e.stopPropagation()
      e.preventDefault()
    }} />
    <div className="photo-card" onClick={onClick}>
      <img src={image} />
    </div>
  </div>
}
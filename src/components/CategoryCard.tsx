import React from 'react'
import './CategoryCard.scss'
import galleryThumbJpg from '../images/gallery-thumb.jpg'
import deletIcon from '../icons/delete.svg'

interface Props {
  title: string
  image: string
  onClick?: () => any,
  onDelete?: () => any,
}

export const CategoryCard: React.FC<Props> = ({
  title, image, onClick, onDelete
}) => {
  return <div className="category-card-wrapper">
    <img className="deleteIcon" src={deletIcon} onClick={e => {
      if (onDelete) onDelete()
      e.stopPropagation()
      e.preventDefault()
    }} />
    <div className="category-card" onClick={onClick} >
      <img className="photo" src={image} />
      <div className="p-1 pt-2 text-center text-grey">
        <h2>{title}</h2>
      </div>
    </div>
  </div>
}
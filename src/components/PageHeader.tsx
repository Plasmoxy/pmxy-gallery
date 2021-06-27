import React from 'react'
import './PageHeader.scss'
import backSvg from '../icons/back.svg'
import { useHistory } from 'react-router-dom'

export function PageHeader(props: {title: string, backButton: boolean}) {
  const history = useHistory()
  return <>
    <div className="d-flex justify-content-start">
      <span
      className={`page-header d-flex align-items-center ${props.backButton ? "pointer" : ""}`}
      onClick={props.backButton ? history.goBack : undefined}
      >
        {props.backButton && <img className="back-button" src={backSvg} />}
        <h2 className={`text-light ${props.backButton ? "back-title" : ""}`}>{props.title}</h2>
      </span>
    </div>
    <hr />
    <div className="mt-4"></div>
  </>
}
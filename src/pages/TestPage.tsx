import React from 'react'
import { PageHeader } from '../components/PageHeader'
import { useHistory, useParams } from 'react-router-dom'

export function TestPage() {

  const { path } = useParams<{path: string}>()
  
  return <>
    <PageHeader title="Test" backButton={true} />
    <div className="text-light">
      TOTO JEST TEST PAGE XDXDXDXD<br />
      path = {path}
    </div>
  </>
}
import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { queryCache } from 'react-query'
import addSvg from '../icons/add.svg'
import * as gservice from '../services/gallery.service'

export function NewCategoryForm({hide}: {hide: () => any}) {
  
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  
  const submit = async () => {
    
    if (name === "") {
      setError("Musíte zadať meno kategórie")
      return
    }
    
    try {
      await gservice.createGallery(name)
      await queryCache.invalidateQueries("fetchCategories")
      hide()
    } catch(e) {
      if (e.response?.status === 409) { // key conflict
        setError("Kategória s takýmto názvom už existuje!")
      } else {
        setError("Vyskytla sa chyba pri pridaní kategórie. Kategórie môžu pridávať len prihlásení používatelia.")
      }
    }
  }
  
  return <Card className="p-4">
    <h1>PRIDAŤ KATEGÓRIU</h1>
    <div className="d-flex justify-content-end align-items-center my-2">
      <input
        style={{flex: 1, fontSize: 18}} className="mx-1" type="text"
        value={name} onChange={e => setName(e.target.value)}
      ></input>
      <Button className="p-2" onClick={submit}><img src={addSvg} /> Pridať</Button>
    </div>
    <hr style={{margin: 0, borderTop: "solid 0.2rem rgba(0, 0, 0, 0.1)"}}/>
    {error !== "" && <p className="text-danger mt-4">{error}</p>}
  </Card>
}

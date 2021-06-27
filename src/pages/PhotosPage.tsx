import Axios from 'axios'
import React, { useCallback } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import { useQuery, queryCache } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { PhotoCard } from '../components/PhotoCard'
import addBigSvg from '../icons/add_big.svg'
import { useStore } from '../model/Store'
import * as gservice from '../services/gallery.service'
import "./PhotosPage.scss"

export function PhotosPage() {
  
  const update = useStore(s => s.update)
  
  const { path } = useParams<{path: string}>()
  const qGallery = useQuery(["fetchGallery", path], () => {
    if (path) return gservice.fetchGallery(path)
  })
  
  // file drop
  const onDrop = useCallback(async (files) => {
    
    if (!qGallery.data) {
      alert("Chyba: kategória nebola načítaná.")
      return
    }
    
    for (const file of files) {
      try {
        await gservice.uploadImage(path, file)
      } catch(e) {
        update(s => {s.errorModals.push("Nahrávať fotky môžu len prihlásení používatelia!")})
      }
    }
    
    await queryCache.invalidateQueries(["fetchGallery", path])
  }, [qGallery.data])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: 'image/*'})
  
  return <>
    <PageHeader title={qGallery.data?.name ?? ""} backButton={true} />
    
    {path && qGallery.isSuccess && 
      <Row>
        {(qGallery.data.images as any[]).map((image: any, imageIdx) =>
          <Col key={image.name} sm={6} lg={3} className="d-flex justify-content-center p-0">
            
            {/* TODO: 290x192 PHOTO ??? resize thumbnail ? */}
            <PhotoCard
              image={gservice.getThumbnailUrl(image.name)}
              onClick={() => {
                update(s=>{
                  s.lightbox.images = qGallery.data.images
                  s.lightbox.idx = imageIdx
                  s.lightbox.open = true
                })
                // setLightboxIdx(imageIdx)
                // setLightboxOpen(true)
              }}
              onDelete={async () => {
                try {
                  await gservice.deleteImageFromGallery(path, encodeURI(image.name))
                  await queryCache.invalidateQueries(["fetchGallery", path])
                } catch(e) {
                  update(s => {s.errorModals.push("Obrázok môžu odstrániť len prihlásení používatelia!")})
                }
              }}
            />
          </Col>
        )}

        <Col {...getRootProps()} sm={6} lg={3} className="d-flex">
          <input {...getInputProps()} />
          <div className={`gallery-add-photo-card`}>
            <img src={addBigSvg} className="my-3" />
            <h2>Pridať fotky</h2>
          </div>
        </Col>
      </Row>
    }
  </>
}
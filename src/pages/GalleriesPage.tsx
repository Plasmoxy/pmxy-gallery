import React, { useState } from 'react'
import "./GalleriesPage.scss"
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap'
import galleryThumbJpg from '../images/gallery-thumb.jpg'
import addBigSvg from '../icons/add_big.svg'
import addSvg from '../icons/add.svg'
import { Link } from 'react-router-dom'
import { CategoryCard } from '../components/CategoryCard'
import { PageHeader } from '../components/PageHeader'
import { useAppModal } from '../components/AppModal'
import { NewCategoryForm } from '../components/NewCategoryForm'
import axios from 'axios'
import { useQuery, queryCache } from 'react-query'
import { useStore } from '../model/Store'
import * as gservice from '../services/gallery.service'

export function GalleriesPage() {

  const [show, hide] = useAppModal(() => <NewCategoryForm hide={hide} />)
  const update = useStore(s => s.update);

  const qGalleries = useQuery(
    'fetchCategories',
    () => gservice.fetchAllGalleries()
  )

  return <>
    <PageHeader title="Kategórie" backButton={false} />
    
    {qGalleries.isSuccess &&
      <Row>
        {qGalleries.data.map((gallery: any) =>
          <Col key={gallery.name} sm={6} lg={3}>
            <Link to={`/gallery/${encodeURI(gallery.name)}`}>
              <CategoryCard
                title={gallery.name}
                image={gallery.image ? gservice.getThumbnailUrl(gallery.image.name) : galleryThumbJpg}
                onDelete={async () => {
                  try {
                    await gservice.deleteGallery(encodeURI(gallery.name))
                  } catch(e) {
                    update(s => {s.errorModals.push("Chyba pri vymazávaní galérie. Galériu môžu vymazať len prihlásení používatelia.")})
                  }
                  await queryCache.invalidateQueries("fetchCategories")
                }}
              />
            </Link>
          </Col>
        )}

        <Col sm={6} lg={3} className="d-flex">
          <div className="gallery-add-category-card" onClick={show}>
            <img src={addBigSvg} className="my-3" />
            <h2>Pridať kategóriu</h2>
          </div>
        </Col>
      </Row>
    }
    
    
  </>
}
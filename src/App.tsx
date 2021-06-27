import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'core-js/stable'
import React, { useEffect } from "react"
import { render } from "react-dom"
import { ModalProvider } from 'react-modal-hook'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { GalleriesPage } from './pages/GalleriesPage'
import { ReactQueryDevtools} from 'react-query-devtools'
import 'regenerator-runtime/runtime'
import './App.scss'
import nightcityJpg from './images/nightcity.jpg'
import northernImage from './images/northern.png'
import cameraSvg from './icons/camera.svg'
import { BrowserRouter, Route, useHistory } from 'react-router-dom'
import { PageHeader } from './components/PageHeader'
import { TestPage } from './pages/TestPage'
import { PhotosPage } from './pages/PhotosPage'
import { AppLightbox } from './components/AppLightbox'
import { ErrorModal } from './components/ErrorModal'

const routes = [
  { path: "/", component: GalleriesPage },
  { path: "/test/:path", component: TestPage },
  { path: "/gallery/:path", component: PhotosPage },
]

function App() {

  const history = useHistory()

  useEffect(() => {
    return history.listen((loc, action) => {
      // scroll to top on history push
      if (action === "PUSH") {
        window.scrollTo(0, 0)
      }
    })
  }, [history])

  return <>
    <ReactQueryDevtools />
    
    <AppLightbox />
    <ErrorModal />
  
    <div className="background-container">
      <img src={northernImage} />
    </div>

    <div className="container content-container px-0">
      <h1 className="d-flex align-items-center text-light" ><img className="pb-1 mr-3" src={cameraSvg} />PMXY GALLERY</h1>
      
      {routes.map(r => <Route key={r.path} exact path={r.path}>{({ match }) => (
        <CSSTransition
          in={match != null}
          timeout={3000}
          classNames="transition-page"
          unmountOnExit
        >
          <div className="content-page">
            <r.component />
          </div>
        </CSSTransition>
      )}</Route>)}
    </div>
  </>
}

render(
  <ModalProvider rootComponent={TransitionGroup}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ModalProvider>,
  document.getElementById("reactRoot")
)

// HMR
if (module.hot) {
  module.hot.accept()
}
import { useEffect, useState } from 'react'
import './App.css'
import { closeApp, getAllUserContacts, getUserAvatar, getUserAyobaContacts, getUserCarrier, getUserCountryCode, getUserLanguageCode, getUserLocation, getUserName, getUserPhoneNumber, getUserPresence, getUserSecuredNumber, shareUrl, triggerSetCarrier, triggerSetSecuredNumber } from 'ayoba-microapp-api'

function App() {

  const [userData, setUserData] = useState({ phoneNumber: '', country: '', language: '', ayobaContacts: '', allContacts: '',})
  const [location, setLocation] = useState({lon: 'null', lat: 'null'})
  const [presence, setPresence] = useState('null')
  const [name, setName] = useState('null')
  const [avatar, setAvatar] = useState('')
  const [carrier, setCarrier] = useState('')
  const [securedNumber, setSecuredNumber] = useState('')
  const [link, setLink] = useState('')

  getUserLocation(val => setLocation(val), handleErr)
  getUserPresence(val => setPresence(val), handleErr)
  getUserName(val => setName(val), handleErr)
  getUserAvatar(val => setAvatar(val), handleErr)
  getUserCarrier(val => setCarrier(val), handleErr)
  getUserSecuredNumber(val => setSecuredNumber(val), handleErr)


  function setStateData(field) {
    let finalKey = '';
    let finalValue = '';
    switch (field) {
      case 'phoneNumber':
        finalKey = field
        getUserPhoneNumber(res => finalValue = res, handleErr)
        break;
      case 'country':
        finalKey = field
        getUserCountryCode(res => finalValue = res, handleErr)
        break;
      case 'language':
        finalKey = field
        getUserLanguageCode(res => finalValue = res, handleErr)
        break;
      case 'ayobaContacts':
        finalKey = field
        getUserAyobaContacts(res => finalValue = res, handleErr)
        break;
      case 'allContacts':
        finalKey = field
        getAllUserContacts(res => finalValue = res, handleErr)
        break;
      default:
        break;
    }
    setUserData(value => { return { ...value, [finalKey]: finalValue } })
  }

  function handleErr(err) {
    console.log('handled Error:',err)
  }


  return (
    <>
      <h1 className="text-dark mt-3 text-center">Ayoba API NPM Test</h1>
      <p className="text-center fw-light small mb-5">The npm package is hosted on The NPM registry</p>
      <main className="container">
        <div className="mb-4">
          <div id="profile-container" className="text-center">
            <img id="profile-img" width="150" className=" m-3 rounded-circle" src={avatar} alt="" />
            <p className="mb-1" id="profile-name">{name}</p>
          </div>
          {/* <button className="btn btn-sm btn-outline-primary w-100" onClick="showprofile()">Show Profile</button> */}
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold mb-1 text-primary">Msisdn</label>
          <p className="fw-light mb-1 small">Gets user's phone number</p>
          <p className={`form-control form-control-sm mb-1 ${userData.phoneNumber ? 'border-warning' : ''}`} id="number" >{userData.phoneNumber}</p>
          <button className="btn btn-sm btn-outline-primary w-100" onClick={() => setStateData('phoneNumber')}>
            Get Msisdn
          </button>
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold mb-1 text-primary">Country</label>
          <p className="fw-light mb-1 small">Gets user's Country code</p>
          <p className={`form-control form-control-sm mb-1 ${userData.country ? 'border-warning' : ''}`} id="countryCode" >{userData.country} </p>
          <button className="btn btn-sm btn-outline-primary w-100" onClick={() => setStateData('country')}>Get Country</button>
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold mb-1 text-primary">Ayoba Contacts</label>
          <p className="fw-light mb-1 small">Gets user's Ayoba regitered contacts</p>
          <p className={`form-control form-control-sm mb-1 ${userData.ayobaContacts ? 'border-warning' : ''}`} id="contacts" >{userData.ayobaContacts}</p>
          <button className="btn btn-sm btn-outline-primary w-100" onClick={() => setStateData('ayobaContacts')}>Get Ayoba Contacts</button>
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold mb-1 text-primary">All Contacts</label>
          <p className="fw-light mb-1 small">Gets all user's phone contacts</p>
          <p className={`form-control form-control-sm mb-1 ${userData.allContacts ? 'border-warning' : ''}`} id="allContacts" >{userData.allContacts}</p>
          <button className="btn btn-sm btn-outline-primary w-100" onClick={() => setStateData('allContacts')}>Get All Contacts</button>
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold mb-1 text-primary">Language</label>
          <p className="fw-light mb-1 small">Gets language code</p>
          <p className={`form-control form-control-sm mb-1 ${userData.language ? 'border-warning' : ''}`} id="languageCode" >{userData.language}</p>
          <button className="btn btn-sm btn-outline-primary w-100" onClick={() => setStateData('language')}>Get Language</button>
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold mb-1 text-primary">Location</label>
          <p className="fw-light mb-1 small">Gets user's location coordinates as they change</p>
          <div className="">
            <div className="d-flex">
              <label>longitude:</label>
              <p id="location-lon" className="form-control ms-2 w-75 form-control-sm mb-1">{location.lon}</p>
            </div>
            <div className="d-flex">
              <label>latitude:</label>
              <p id="location-lat" className="form-control ms-2 w-75 form-control-sm mb-1">{location.lat}</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold mb-1 text-primary">Presence</label>
          <p className="fw-light mb-1 small">Gets user's presence live data</p>
            <div className="d-flex">
              <label>Presence:</label>
              <p className="form-control ms-2 w-75 form-control-sm mb-1">{presence}</p>
            </div>
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold mb-1 text-primary">Share Link</label>
          <p className="fw-light mb-1 small">opens a dialogue to share url string</p>
          <input className={`form-control form-control-sm mb-1 ${link ? 'border-warning' : ''}`} onChange={(e) => setLink(e.target.value)} />
          <button className="btn btn-sm btn-outline-primary w-100" onClick={() => shareUrl(link)}>Share</button>
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold mb-1 text-primary">Network Carrier</label>
          <p className="fw-light mb-1 small">Gets user's network carrier</p>
          <p className={`form-control form-control-sm mb-1 ${carrier ? 'border-warning' : ''}`} id="carrier" >{carrier} </p>
          <button className="btn btn-sm btn-outline-primary w-100" onClick={() => triggerSetCarrier()}>Get Network Carrier</button>
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold mb-1 text-primary">Secured Number</label>
          <p className="fw-light mb-1 small">Gets user's secured number</p>
          <p className={`form-control form-control-sm mb-1 overflow-x-scroll ${securedNumber ? 'border-warning' : ''}`} id="carrier" >{securedNumber} </p>
          <button className="btn btn-sm btn-outline-primary w-100" onClick={() => triggerSetSecuredNumber()}>Get Secured Number</button>
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold mb-1 text-primary">Close Application</label>
          <p className="fw-light mb-1 small">Closes application</p>
          <button className="btn btn-sm btn-outline-primary w-100" onClick={closeApp}>close app</button>
        </div>
      </main>
    </>

  )
}

export default App

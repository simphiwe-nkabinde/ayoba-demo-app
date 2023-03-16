import { useState } from 'react'
import './App.css'
import { closeApp, getAllUserContacts, getUserAyobaContacts, getUserCountryCode, getUserLanguageCode, getUserPhoneNumber, getUserProfile } from 'ayoba-microapp-api'

function App() {

  const [userData, setUserData] = useState({ phoneNumber: '', country: '', language: '', ayobaContacts: '', allContacts: '' })

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
    alert(err)
  }


  return (
    <>
      <h1 className="text-dark mt-3 text-center">Ayoba API NPM Test</h1>
      <p className="text-center fw-light small mb-5">The npm package is hosted on The NPM registry</p>
      <main className="container">
        <div className="mb-4">
          <div id="profile-container" className="text-center">
            <img id="profile-img" width="150" className=" m-3 rounded-circle" src={getUserProfile().profileImage} alt="" />
            <p className="mb-1" id="profile-name">{getUserProfile().name}</p>
          </div>
          {/* <button className="btn btn-sm btn-outline-primary w-100" onClick="showprofile()">Show Profile</button> */}
        </div>
        <div className="mb-4">
          <label htmlFor="number" className="form-label fw-bold mb-1 text-primary">Msisdn</label>
          <p className="fw-light mb-1 small">Gets user's phone number</p>
          <input className={`form-control form-control-sm mb-1 ${userData.phoneNumber ? 'border-warning' : ''}`} id="number" value={userData.phoneNumber} />
          <button className="btn btn-sm btn-outline-primary w-100" onClick={() => setStateData('phoneNumber')}>
            Get Msisdn
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="number" className="form-label fw-bold mb-1 text-primary">Country</label>
          <p className="fw-light mb-1 small">Gets user's Country code</p>
          <input className={`form-control form-control-sm mb-1 ${userData.country ? 'border-warning' : ''}`} id="countryCode" value={userData.country} />
          <button className="btn btn-sm btn-outline-primary w-100" onClick={() => setStateData('country')}>Get Country</button>
        </div>
        <div className="mb-4">
          <label htmlFor="number" className="form-label fw-bold mb-1 text-primary">Ayoba Contacts</label>
          <p className="fw-light mb-1 small">Gets user's Ayoba regitered contacts</p>
          <input className={`form-control form-control-sm mb-1 ${userData.ayobaContacts ? 'border-warning' : ''}`} id="contacts" value={userData.ayobaContacts} />
          <button className="btn btn-sm btn-outline-primary w-100" onClick={() => setStateData('ayobaContacts')}>Get Ayoba Contacts</button>
        </div>
        <div className="mb-4">
          <label htmlFor="number" className="form-label fw-bold mb-1 text-primary">All Contacts</label>
          <p className="fw-light mb-1 small">Gets all user's phone contacts</p>
          <input className={`form-control form-control-sm mb-1 ${userData.allContacts ? 'border-warning' : ''}`} id="allContacts" value={userData.allContacts} />
          <button className="btn btn-sm btn-outline-primary w-100" onClick={() => setStateData('allContacts')}>Get All Contacts</button>
        </div>
        <div className="mb-4">
          <label htmlFor="number" className="form-label fw-bold mb-1 text-primary">Language</label>
          <p className="fw-light mb-1 small">Gets language code</p>
          <input className={`form-control form-control-sm mb-1 ${userData.language ? 'border-warning' : ''}`} id="languageCode" value={userData.language} />
          <button className="btn btn-sm btn-outline-primary w-100" onClick={() => setStateData('language')}>Get Language</button>
        </div>
        <div className="mb-4">
          <label htmlFor="number" className="form-label fw-bold mb-1 text-primary">Location</label>
          <p className="fw-light mb-1 small">Gets user's location coordinates as they change</p>
          <div className="">
            <div className="d-flex">
              <label htmlFor="form-label">longitude:</label>
              <input id="location-lon" className="form-control ms-2 w-75 form-control-sm mb-1" />
            </div>
            <div className="d-flex">
              <label htmlFor="form-label">latitude:</label>
              <input id="location-lat" className="form-control ms-2 w-75 form-control-sm mb-1" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="number" className="form-label fw-bold mb-1 text-primary">Close Application</label>
          <p className="fw-light mb-1 small">Closes application</p>
          <button className="btn btn-sm btn-outline-primary w-100" onClick={closeApp}>close app</button>
        </div>
      </main>
    </>

  )
}

export default App

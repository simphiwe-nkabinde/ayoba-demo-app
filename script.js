import ayoba from './node_modules/ayoba-microapp-api/index.js'

const locationLat = document.querySelector('#location-lat')
const locationLon = document.querySelector('#location-lon')
const messageContent = document.querySelector('#msg-content')
const profileImg = document.querySelector('#profile-img')
const profileName = document.querySelector('#profile-name')
const imgSrc = document.querySelector('#img-src')
const profileContainer = document.querySelector('#profile-container')

function showPhoneNumber() {
    const display = document.getElementById('number')
    const data = ayoba.getUserPhoneNumber(
        (res) => {
            display.value = res;
            display.classList.add('border-warning')
        }
        , (err) => {
            display.value = `error: ${err}`
            display.classList.add('border-danger')
        }
    )
}
function showCountryCode() {
    const display = document.getElementById('countryCode')
    const data = ayoba.getUserCountryCode(
        (res) => {
            display.value = res;
            display.classList.add('border-warning')
        }
        , (err) => {
            display.value = `error: ${err}`
            display.classList.add('border-danger')
        }
    )
}
function showAyobaContacts() {
    const display = document.getElementById('contacts')
    const data = ayoba.getUserAyobaContacts(
        (res) => {
            let contacts = ''
            JSON.parse(res).forEach(contact => {
                contacts += `${contact.name}: ${contact.phoneNumber}, `
            });
            display.value = contacts;
            display.classList.add('border-warning')
        }
        , (err) => {
            display.value = `error: ${err}`
            display.classList.add('border-danger')
        }
    )
}
function showAllContacts() {
    const display = document.getElementById('allContacts')
    const data = ayoba.getAllUserContacts(
        (res) => {
            let contacts = ''
            JSON.parse(res).forEach(contact => {
                contacts += `${contact.name}: ${contact.phoneNumber}, `
            });
            display.value = contacts;
            display.classList.add('border-warning')
        }
        , (err) => {
            display.value = `error: ${err}`
            display.classList.add('border-danger')
        }
    )
}
function showLanguageCode() {
    const display = document.getElementById('languageCode')
    const data = ayoba.getUserLanguageCode(
        (res) => {
            display.value = res;
            display.classList.add('border-warning')
        }
        , (err) => {
            display.value = `error: ${err}`
            display.classList.add('border-danger')
        }
    )
}

function onLocationChanged(lon, lat) {
    locationLat.value = lat;
    locationLon.value = lon;
}
function onNicknameChanged(nickname) {
    profileName.innerText = nickname
}
function onAvatarChanged(avatar) {
    profileImg.src = avatar
}

function showprofile() {
    profileContainer.classList.remove('d-none')
}
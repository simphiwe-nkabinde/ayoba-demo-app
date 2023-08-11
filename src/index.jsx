import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import "./style.css";
import ScoreCard from "./ScoreCard";
import TopThree from "./TopThree";
const API_TOKEN = '5567f122ee95a37d8f83de31d1dbe482db5c2c05e052b61dacd4823168ce5a8ee28ed489b2bdf34ef46dbe7c017e34d8e22ce040f8834a7013214464ff6a4c00f82f6fa822266b7379d7e3d5d02cda22703fa44b5e92d6a217d1373ecc34bbdda4856b985942627d86ac4dab8677c29a95acbb87d68338106aa95182ea8eb5e1'

export function App() {
  //query
  const queryParams = new URLSearchParams(window.location.search)
  const gameId = queryParams.get('gameId');
  const userJid = queryParams.get('jid');

  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState([]);
  const [error, setError] = useState({ exists: false, message: '' });
  const [currentPlayer, setCurrentPlayer] = useState({ attributes: undefined });
  const [currentPlayerPosition, setCurrentPlayerPosition] = useState(0)

  useEffect(() => {
    if (!gameId || !userJid) {
      setError({ exists: true, message: 'gameid or jid not found in query params' });
    } else {
      fetch(`http://localhost:1337/api/player-scores?filters[jid][$eq]=${userJid}`, {
        headers: { "Authorization": `bearer ${API_TOKEN}` }
      })
        .then(res => res.json())
        .then(data => { setCurrentPlayer(data.data[0]) })

      setLoading(true);
      fetch(`http://localhost:1337/api/player-scores?filters[game][uid][$eq]=${gameId}&sort=score:desc`, {
        headers: { "Authorization": `bearer ${API_TOKEN}` }
      })
        .then(res => res.json())
        .then(data => {
          if (!data.data.length) {
            return setError({ exists: true, message: 'No scores found for this game' })
          }
          setScores(data.data)
        })
        .finally(() => { setLoading(false) });
    }
  }, []);

  //filter by country and set current players position
  useEffect(() => {
    if (currentPlayer?.attributes?.country) {
      setScores(scores.filter((val => val.attributes.country == currentPlayer.attributes.country)))
      const playerIndex = scores.findIndex(val => val.attributes.jid == userJid)
      setCurrentPlayerPosition(playerIndex + 1)
    }

  }, [JSON.stringify(currentPlayer), JSON.stringify(scores)])

  function showErrorMessage(message) {
    return (
      <div class={`text-center rounded-4 h-100 py-5`}>
        <div class='display-4 text-blue1 fw-semibold mb-5'>Leaderboard</div>
        <p class='small text-danger'>{message}</p>
      </div>
    )
  }
  return (
    <>
      {error.exists ? showErrorMessage(error.message) :
        <>
          <div class={`text-center bg-light rounded-4 h-100 py-5 ${!loading && 'd-none'}`}>
            <div class="spinner-grow text-primary-emphasis" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class='my-3 text-body-tertiary'>fetching leaderboard</p>
          </div>
          {!loading &&
            <div class='bg-light ps-2 pe-2 pt-2 pb-0 rounded-top-4 d-flex flex-column justify-content-between'>
              <div>
                <button class='btn position-absolute' id='leaderboard-close-btn'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                  </svg>
                </button>
                <div class='text-blue1 text-center fw-semibold display-4 mb-5'>Leaderboard</div>
              </div>
              <TopThree scores={scores.slice(0, 3).map(i => i.attributes)} />

              {currentPlayer?.attributes &&
                <ScoreCard position={currentPlayerPosition} scoreData={currentPlayer.attributes} isUserScore={true} color='blue3' className='rounded-3 mb-4' />}

              <div style={{ maxHeight: '250px' }} class='rounded-top-3 border border-blue3 overflow-y-scroll overflow-x-hidden'>
                {scores.map((score, index) =>
                  <ScoreCard color={!index ? 'blue2' : 'light'} key={index} scoreData={score.attributes} position={index + 1} />)}
              </div>
              <div class='text-light'>.</div>
            </div>}
        </>}
    </>
  );
}

render(<App />, document.getElementById("app"));

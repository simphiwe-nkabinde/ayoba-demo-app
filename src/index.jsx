import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import "./style.css";
import ScoreCard from "./ScoreCard";
import Header from "./Header";
import TopThree from "./TopThree";

export function App() {
  //query
  const queryParams = new URLSearchParams(window.location.search)
  // const gameId = queryParams.get('gameId');
  const userJid = queryParams.get('jid');

  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState([]);
  const [gameData, setGameData] = useState({});
  const topMax = 10

  const gameId = "55c7b601-7854-444d-839a-c92de2c5d01d";

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:1337/api/games?filters[uid][$eq]=${gameId}&populate=*`)
      .then(res => res.json())
      .then(data => {
        setGameData(data.data[0].attributes);
        setScores(
          data.data[0].attributes.playerScores.data
            .sort((a, b) => b.attributes.score - a.attributes.score))
      })
      .finally(() => { setLoading(false) });
  }, []);

  return (
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
            <div class='text-center text-blue1 d-flex justify-content-between align-items-center fw-semibold display-4 mb-5'>
              <button class='btn' id='leaderboard-close-btn'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </button>

              <div>Leaderboard</div><div></div>
            </div>
            <TopThree scores={scores.slice(0, 3).map(i => i.attributes)} />
          </div>

          <div class='mb-4'>
            <ScoreCard scoreData={scores[0]?.attributes} color='blue3' className='rounded-3' />
          </div>

          <div style={{ maxHeight: '250px' }} class='rounded-top-3 border border-blue3 overflow-y-scroll overflow-x-hidden'>
            {scores.slice(0, topMax).map((score, index) =>
              <ScoreCard color={!index ? 'blue2' : 'light'} key={index} scoreData={score.attributes} position={index + 1} />)}
          </div>
          <div class='text-light'>.</div>
        </div>}
    </>
  );
}

render(<App />, document.getElementById("app"));

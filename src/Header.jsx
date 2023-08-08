import React from 'react'

export default function Header({gameData}) {
    return (
        <header class='text-center p-3 text-primary-emphasis rounded-bottom-4 mb-3 text-capitalize'>
            <h1 class='display-4'>{gameData?.name} </h1>
            <img style={{ width: '40px' }} class='rounded-circle border' src={`http://localhost:1337${gameData?.image?.data?.attributes?.url}`} alt="" />
            <p>Leaderboard</p>
        </header>
    )
}

import React from 'react'

export default function ScoreCard({ scoreData, position, color, className, isUserScore }) {

    const styles = {
        light: { text: 'text-blue2', bg: 'bg-light border-bottom border-blue3', border: 'border-blue2' },
        blue2: { text: 'text-light', bg: 'bg-blue2', border: 'border-blue3' },
        blue3: { text: 'text-blue2', bg: 'bg-blue3', border: 'border-blue2' }
    }

    function maskIfNumber(str) {
        if (!/^\+\d{10,16}$/.test(str)) return str
        const code = str.substring(0, 3)
        const toHide = str.substring(3, 8)
        const end = str.substring(8)
        return code + toHide.replace(/[0-9]/g, '*') + end
    }
    function isMsisdn(str) {
        return /^\+\d{10,16}$/.test(str)
    }

    return (
        <div class={`${styles[color].bg} ${styles[color].text} ${className} p-3 d-flex align-items-center justify-content-between`}>
            <div class='d-flex align-items-center'>
                {position && <div class='me-4'>{position}</div>}
                {scoreData?.avatar
                    ? <img class='rounded-circle img-fluid' src={scoreData?.avatar} alt="" />
                    : <div style={{ width: '50px', height: '50px' }} class={`${styles[color].border} d-flex justify-content-center align-items-center border rounded-circle text-uppercase`}>
                        {scoreData?.playerNickname[0]}
                    </div>
                }
                <div class='ms-3'>
                    <div class='fw-medium'>
                        {(!isUserScore && !isMsisdn(scoreData?.playerNickname)) && scoreData?.playerNickname}
                        {isUserScore && 'Your Score'}
                    </div>
                    <div class='small'>{maskIfNumber(scoreData?.msisdn)}</div>
                </div>
            </div>
            <div class='text-end'>{scoreData?.score} <span class='small d-block'>points</span></div>
        </div>
    )
}

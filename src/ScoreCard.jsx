import React from 'react'

export default function ScoreCard({ scoreData, position, color, className }) {

    const styles = {
        light: { text: 'text-blue2', bg: 'bg-light border-bottom border-blue3', border: 'border-blue2' },
        blue2: { text: 'text-light', bg: 'bg-blue2', border: 'border-blue3' },
        blue3: { text: 'text-blue2', bg: 'bg-blue3', border: 'border-blue2' }
    }

    function maskIfNumber(str) {
        let reg = new RegExp("^([\+]?[(]?[0-9]{3})[) ]?[-\s\.]?([0-9]{3}[-\s\. ]?[0-9]{4,6})$")
        if (reg.exec(str)?.length === 3) {
            return reg.exec(str)[1] + (reg.exec(str)[2].split("").map((str) => "*").join(""))
        }
        else {
            return str
        }
    }

    const positionColor = [
        '',
        'text-warning',
        'text-secondary',
        'text-warning-emphasis'
    ]

    return (
        <div class={`${styles[color].bg} ${styles[color].text} ${className} py-3 px-2 d-flex align-items-center justify-content-between`}>
            <div class='d-flex'>
                {scoreData?.avatar && <img class='rounded-circle img-fluid' src={scoreData?.avatar} alt="" />}
                {!scoreData?.avatar && <div style={{ width: '50px', height: '50px' }} class={`${styles[color].border} d-flex justify-content-center align-items-center border rounded-circle text-uppercase`}>
                    {scoreData?.nickname[0]}
                </div>}
                <div class='ms-3'>
                    <div class='fw-medium'>{maskIfNumber(scoreData?.nickname)}</div>
                    <div>{scoreData?.score} points</div>
                </div>
            </div>
            <div class='me-2'>{position}</div>
        </div>
    )
}

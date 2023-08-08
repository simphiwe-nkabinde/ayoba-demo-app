import React from 'react'

export default function TopThree({ scores }) {
    const first = scores[0];
    const second = scores[1];
    const third = scores[2];

    function maskIfNumber(str) {
        let reg = new RegExp("^([\+]?[(]?[0-9]{3})[) ]?[-\s\.]?([0-9]{3}[-\s\. ]?[0-9]{4,6})$")
        if (reg.exec(str)?.length === 3) {
            return reg.exec(str)[1] + (reg.exec(str)[2].split("").map((str) => "*").join(""))
        }
        else {
            return str
        }
    }
    return (
        <div class='d-flex justify-content-evenly align-items-end mb-5'>
            <div class='align-items-center d-flex flex-column'>
                <div class='position-relative align-items-center d-flex flex-column mb-3'>
                    {second?.avatar && <img style={{ width: '48px', height: '48px' }} class='rounded-circle border border-blue1 img-fluid' src={second?.avatar} alt="" />}
                    {!second?.avatar && <div style={{ width: '48px', height: '48px' }} class='d-flex fs-3 justify-content-center align-items-center rounded-circle border border-blue1 text-uppercase'>
                        {second?.nickname[0]}
                    </div>}
                    <div class='border-blue1 bg-light border rounded-circle bubble'>2</div>
                </div>
                <small>{maskIfNumber(second?.nickname)}</small>
            </div>
            <div class='position-relative align-items-center d-flex flex-column'>
                <div class='position-relative align-items-center d-flex flex-column mb-3'>
                    {first?.avatar && <img style={{ width: '90px', height: '90px' }} class='rounded-circle border border-3 border-blue1 img-fluid' src={second?.avatar} alt="" />}
                    {!first?.avatar && <div style={{ width: '90px', height: '90px' }} class='d-flex fs-1 justify-content-center align-items-center rounded-circle border border-3 border-blue1 text-uppercase'>
                        {first?.nickname[0]}
                    </div>}
                    <div class='bg-blue1 text-light rounded-circle bubble'>1</div>
                </div>
                <small>{maskIfNumber(first?.nickname)}</small>
            </div>
            <div class='position-relative align-items-center d-flex flex-column'>
                <div class='position-relative align-items-center d-flex flex-column mb-3'>
                    {third?.avatar && <img style={{ width: '48px', height: '48px' }} class='rounded-circle border border-blue1 img-fluid' src={second?.avatar} alt="" />}
                    {!third?.avatar && <div style={{ width: '48px', height: '48px' }} class='d-flex fs-3 justify-content-center align-items-center rounded-circle border border-blue1 text-uppercase'>
                        {third?.nickname[0]}
                    </div>}
                    <div class='border-blue1 bg-light border rounded-circle bubble'>3</div>
                </div>
                <small>{maskIfNumber(third?.nickname)}</small>
            </div>
        </div>
    )
}
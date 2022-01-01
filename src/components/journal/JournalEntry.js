import React from 'react'

export const JournalEntry = () => {
    return (
        <div className='journal__entry pointer'>
            <div className='journal__entry-picture' style={{
                backgroundSize: 'cover',
                backgroundImage: 'url(https://i.pinimg.com/280x280_RS/e1/32/6c/e1326c555d1d2e1ab264a3b4ca7eb0bd.jpg)'
            }}>
            </div>

            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    Un Nuevo Dia
                </p>
                <p className='journal__entry-content'>
                    Fugiat eu irure eu sit eiusmod amet laborum occaecat nulla exercitation dolor elit quis consectetur.
                </p>
            </div>

            <div className='journal__entry-date-box'>
                <span>Monday</span>
                <h4>24</h4>
            </div>
        </div>
    )
}

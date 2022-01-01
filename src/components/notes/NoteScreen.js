import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className='notes__main-content'>
            <NotesAppBar />

            <div className='notes__content'>
                <input 
                    type="text"
                    placeholder='Some Awesome Title'
                    className='notes__title-input'
                    autoComplete='off'
                />
                
                <textarea 
                    placeholder='What happened today'
                    className='notes__textarea'
                >                    
                </textarea>

                <div className='notes__image'>
                    <img
                        src='https://i.pinimg.com/236x/aa/26/fc/aa26fc8be4c3c61fac18e89c08ea1e00--amazing-photos-beautiful-pictures.jpg'
                        alt='nature'
                    >
                    </img>
                </div>

            </div>
        </div>
    )
}

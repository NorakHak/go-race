import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { Garage } from '../Garage/Garage'
import Winners from '../Winners/Winners'

import "./Content.css"

export const Content: React.FC = () => {

    return (
        <main className="content">
            <Routes>
                <Route path='/' element={<Garage />} />
                <Route path='/winners' element={<Winners />} />
            </Routes>
        </main>
    )

}

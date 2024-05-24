import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Registration } from './registration'
import { Login } from './sign-in'

export const Authorization = () => {
    return (
        <Routes>
            <Route path={"register"} element={<Registration />}></Route>
            <Route path={"sign-in"} element={<Login />}></Route>
            {/* <Route path={"confirm_password"} element={<ConfirmPassword/>}></Route> */}
        </Routes>
    )
}

import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Registration } from './registration'
import { Login } from './sign-in'
import { useJwtStore } from '../../stores/jwt'
import { ConfirmEmail } from './confirm-email'

export const Authorization = () => {

    const navigate = useNavigate()

    return (
        <Routes>
            <Route path={"register"} element={<Registration />}></Route>
            <Route path={"email-confirm"} element={<ConfirmEmail />}></Route>
            <Route path={"sign-in"} element={<Login />}></Route>
            {/* <Route path={"confirm_password"} element={<ConfirmPassword/>}></Route> */}
        </Routes>
    )
}

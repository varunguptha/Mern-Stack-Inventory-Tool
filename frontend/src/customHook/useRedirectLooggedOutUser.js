// eslint-disable-next-line
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SET_LOGIN } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { getLoginStatus } from '../services/authService'



const useRedirectLooggedOutUser = (path) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        const redirectLooggedOutUser = async ()=>{
            const isLoggedIn = await getLoginStatus()
            dispatch(SET_LOGIN(isLoggedIn))

            if(!isLoggedIn){
                toast.info("Session Expired, Please login to continue.")
                navigate(path)
                return

            }
        };
        redirectLooggedOutUser()
    },[navigate,path,dispatch])
}

export default useRedirectLooggedOutUser
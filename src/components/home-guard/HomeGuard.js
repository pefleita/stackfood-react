import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";

const HomeGuard = (props) => {
    const {children,from,page} = props
    const router = useRouter()
    const { cartList } = useSelector((state) => state.cart)
    const [checked, setChecked] = useState(false)
    useEffect(
        () => {
            if (!router.isReady) {
                return
            }
            if(from==="checkout" && cartList?.length===0 && page !== 'campaign'){
                router.push('/home')
            }
            const zoneId = JSON.parse(localStorage.getItem('zoneid'))
            const location = localStorage.getItem('location')
            if (zoneId?.length > 0 && location) {
                setChecked(true)
            } else {
                router.push('/')
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.isReady]
    )

    if (!checked) {
        return null
    }

    // If got here, it means that the redirect did not occur, and that tells us that the user is
    // authenticated / authorized.

    return <>
        <CssBaseline/>
        {children}</>
}

HomeGuard.propTypes = {}

export default HomeGuard

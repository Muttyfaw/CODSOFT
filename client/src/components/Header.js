import { Box, styled } from '@mui/material'
import React from 'react'
import { theme } from '../theme'


const Header = () => {

    const StyleHeader = styled(Box)({
         padding: "10px",
         justiftContent: "#center",
         minHeight: "600px",
         backgroundImage: `url`,
         backgroundSize: "cover",
         backgroundPosition: "center",
         backgroundColor: theme.palette.secondary.main
    })
    return (
        <>
            <StyleHeader>

            </StyleHeader>
        </>
    )
}

export default Header
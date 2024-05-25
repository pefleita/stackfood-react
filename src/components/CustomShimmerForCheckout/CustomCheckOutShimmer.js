import React from 'react'
import { Stack, styled } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
const CustomSkeleton = styled(Skeleton)(({ theme }) => ({
    width: "100%",
    height: "50px",
    borderRadius: "8px"
})
)
const CustomCheckOutShimmer = () => {
    return (
        <Stack gap="20px">
            <CustomSkeleton variant="rectangular" />
            <CustomSkeleton variant="rectangular" />
            <CustomSkeleton variant="rectangular" />
        </Stack>
    )
}

export default CustomCheckOutShimmer

import { alpha, Box, Grid, IconButton, styled } from '@mui/material'
import { Stack } from '@mui/system'

export const CustomIconButton = styled(IconButton)(
    ({ theme, nextbutton, color }) => ({
        borderRadius: '50%',
        color:
            nextbutton === 'true'
                ? theme.palette.neutral[100]
                : theme.palette.neutral[1000],
        background:
            nextbutton === 'true'
                ? alpha(theme.palette.primary.main, 0.5)
                : theme.palette.neutral[1400],
        width: '30px',
        height: '30px',
        '&:hover': {
            background:
                nextbutton === 'true'
                    ? theme.palette.primary.main
                    : theme.palette.neutral[300],
        },
    })
)

export const CustomSideOverLay = styled(Stack)(({ theme, left, right ,isdisabled}) => ({
    "&::after":{
        content:'""',
        position: 'absolute',
        width: '69px',
        height: '100%',
        background: `linear-gradient(270deg, ${theme.palette.neutral[900]} 0%, rgba(0, 0, 0, 0) 100%)`,
        opacity: isdisabled? '0':'.23',
        left: left,
        right: right,
        top: '.2%',
        borderRadius: '0px 4px 4px 0px',
    }
}))
export const CustomGridWithBgColor = styled(Grid)(({ theme, foodsize, padding,newSection }) => ({
    background: foodsize > 0 && newSection ?  theme.palette.mode==="dark" ? `linear-gradient(123deg, #262830 16.3%, #19213D 33.95%, #19213D 46.04%, #19213D 61.93%, #262830 81.67%)`:`linear-gradient(123deg, #F6F6F6 16.3%, #F9FAFF 35.29%, #EFF3FF 49.83%, #F4F7FF 61.93%, #F6F6F6 81.67%)`:`${theme.palette.sectionBg}`,
    padding: foodsize > 0 && (padding || '23px 0px 23px 23px'),
    borderRadius: "8px",
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        padding: foodsize > 0 && '10px 0px 13px 10px',
    },
}))

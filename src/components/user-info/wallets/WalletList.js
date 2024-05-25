import React, { useEffect, useState } from 'react'
import {
    Grid,
    Box,
    Typography,
    Stack,
    List,
    ListItem,
    Button,
    styled,
    Select,
    MenuItem,
    alpha,
    Paper,
    useMediaQuery,
} from '@mui/material'
import {
    WallatBox,
    WallateBox,
    WalletBox,
    WalletBoxSection,
} from './Wallets.style'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import WalletsPage from './WalletsPage'
import { useQuery } from 'react-query'
import { WalletApi } from "@/hooks/react-query/config/walletApi"
import { getAmount, getTotalWalletAmount } from "@/utils/customFunctions"
import { ProfileApi } from "@/hooks/react-query/config/profileApi"
import WalletShimmer from './WalletShimmer'
import 'simplebar/dist/simplebar.min.css'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import CustomePagination from '../../pagination/Pagination'
import CustomEmptyResult from '../../empty-view/CustomEmptyResult'
import {
    CustomOutlinedInput,
    CustomPaperBigCard,
    CustomStackFullWidth,
} from "@/styled-components/CustomStyles.style"
import CustomImageContainer from '../../CustomImageContainer'
import walletImage from '../../../../public/static/profile/wa.svg'
import { useTheme } from '@mui/material/styles'
import { onErrorResponse, onSingleErrorResponse } from '../../ErrorResponse'
import Skeleton from '@mui/material/Skeleton'
import Meta from '../../Meta'
import { AddCircle, CheckCircle } from '@mui/icons-material'
import CustomModal from '../../custom-modal/CustomModal'
import { useAddFundToWallet } from "@/hooks/react-query/useAddFundToWallet"
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Router from 'next/router'
import * as PropTypes from 'prop-types'
import { PrimaryButton } from '../../products-page/FoodOrRestaurant'
import toast from 'react-hot-toast'
import WalletFundBonus from './WalletBonus'
import HowToUse from './HowToUse'
import CloseIcon from '@mui/icons-material/Close'
import { noTransactionFound } from "@/utils/LocalImages"
import CustomPopover from '../../custom-popover/CustomPopover'
import useWalletBonus from '../../../hooks/react-query/useGetWalletBonus'
const validationSchema = Yup.object({
    amount: Yup.string().required('Please Enter amount'),
    ///payment_method: Yup.string().required('Payment method is required'),
})
export const transaction_options = [
    {
        label: 'All Transaction',
        value: 'all',
    },
    {
        label: 'Order Transaction',
        value: 'order',
    },
    {
        label: 'Add Fund',
        value: 'add_fund',
    },
    {
        label: 'Loyalty Points Transaction',
        value: 'loyalty_point',
    },
    {
        label: 'Referrer Transactions',
        value: 'referrer',
    },
]

export const CustomSelect = ({
    label,
    children,
    name,
    id,
    value,
    onChange,
}) => {
    return (
        <Select
            labelId={id}
            id={id}
            name={name}
            value={value}
            label={label}
            onChange={onChange}
            sx={{ height: '45px' }}
        >
            {children}
        </Select>
    )
}
const Wallet = ({ page }) => {
    const theme = useTheme()
    const isXSmall = useMediaQuery(theme.breakpoints.down("sm"))
    const [page_limit, setPageLimit] = useState(10)
    const [anchorEl, setAnchorEl] = useState(null);
    const [offset, setOffset] = useState(1)
    const [open, setOpen] = useState(false)
    const [transactionType, setTransactionType] = useState('all')
    const [hasMounted, setHasMounted] = useState(false)
    const { global } = useSelector((state) => state.globalSettings)
    const [value, setValue] = useState(null)
    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint

    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const { t } = useTranslation()
    const base_url = global?.base_urls?.gateway_image_url
    const { isLoading, data, isError, error, refetch } = useQuery(
        ['wallet-list', offset],
        () => WalletApi.walletList(offset, transactionType),
        {
            enabled: false,
        }
    )
    const { data: walleBonus, refetch: walletBonusRefetch, isLoading: walletBonusIsLoading } = useWalletBonus()

    useEffect(() => {
        walletBonusRefetch()
    }, [])
    useEffect(async () => {
        await refetch()
    }, [transactionType])
    useEffect(async () => {
        await refetch()
    }, [offset])

    const { isLoading: profileDataLoading, data: profileData } = useQuery(
        ['profile-info'],
        ProfileApi.profileInfo,
        {
            onError: onSingleErrorResponse,
        }
    )

    const formik = useFormik({
        initialValues: {
            amount: '',
            payment_method: global?.active_payment_method_list[0]?.gateway,
        },
        validationSchema: validationSchema,
        onSubmit: async (values, helpers) => {
            try {

                if (values?.amount > 0) {
                    formSubmitHandler(values)
                } else {
                    toast.error(t('Payment amount can not be 0'))
                }
            } catch (err) { }
        },
    })

    const { mutate, isLoading: addFundIsLoading } = useAddFundToWallet()

    const formSubmitHandler = (values) => {
        const page = 'wallets'
        const callbackUrl = `${window.location.origin}/info?page=${page}`
        const payloadData = {
            ...values,
            callback: callbackUrl,
            payment_platform: 'web',
        }

        mutate(payloadData, {
            onSuccess: async (response) => {
                const url = response?.redirect_link
                Router.push(url)
            },
            onError: onErrorResponse,
        })
    }

    const handleClose = () => {
        setOpen(false)
    }
    useEffect(() => {
        if (page === 'wallets?flag=success' && !hasMounted) {
            return toast.custom(
                () => (
                    <Paper
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.success.dark,
                            color: (theme) => theme.palette.whiteContainer.main,
                            padding: '1rem',
                            borderRadius: '0px',
                        }}
                    >
                        <Typography fontWeight="500" fontSize="13px">
                            {t('Amount Successfully added')}
                        </Typography>
                    </Paper>
                ),
                { id: page }
            )
            setHasMounted(true)
            // return toast.success(t('Amount Successfully added'))
        } else if (page === 'wallets?flag=cancel' && !hasMounted) {
            return toast.custom(
                () => (
                    <Paper
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.error.dark,
                            color: (theme) => theme.palette.whiteContainer.main,
                            padding: '1rem',
                            borderRadius: '0px',
                        }}
                    >
                        <Typography fontWeight="500" fontSize="13px">
                            {t('Add fund cancel ')}
                        </Typography>
                    </Paper>
                ),
                { id: page }
            )
            setHasMounted(true)
        }
    }, [page, hasMounted])
    const handleChange = (e) => {
        setTransactionType(e.target.value)
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClosePopover = () => {
        setAnchorEl(null)
    };
    return (
        <>
            <Meta
                title={` My Wallet-${global?.business_name}`}
                description=""
                keywords=""
            />
            <CustomPaperBigCard
                padding={isXSmall ? '10px 10px' : '30px 40px'}
                border={false}

                sx={{ minHeight: !isXSmall && '558px', boxShadow: isXSmall && 'unset' }}
            >
                <Grid container spacing={3.5}>
                    {!isXSmall &&
                        <Grid item xs={12} md={12}>
                        <Typography fontSize="16px" fontWeight="500">
                            {t('My Wallet')}
                        </Typography>
                    </Grid>}
                    <Grid item sm={12} xs={12} md={4.5}>
                        <WalletBox>
                            <CustomStackFullWidth gap="15px">
                                <Stack flexDirection="row" justifyContent="space-between">
                                    <CustomImageContainer
                                        src={walletImage.src}
                                        width="34px"
                                        height="34px"
                                        objectFit="contain"
                                    />
                                    {walleBonus?.length !== 0 &&
                                        <Stack sx={{
                                            position: "relative",
                                            top: "-12px",
                                            right: "-2px"
                                        }}>

                                            <InfoOutlinedIcon
                                                onClick={handleClick}
                                                sx={{
                                                    color: (theme) =>
                                                        theme.palette.neutral[100],
                                                    cursor:"pointer"
                                                }}
                                            />
                                        </Stack>
                                    }

                                </Stack>
                                <Typography
                                    fontSize="36px"
                                    fontWeight="700"
                                    lineHeight={0.9}
                                    color={theme.palette.neutral[100]}
                                >
                                    {' '}
                                    {profileDataLoading ? (
                                        <Skeleton
                                            variant="text"
                                            width={150}
                                            height="50px"
                                        />
                                    ) : (
                                        getAmount(
                                            profileData?.data
                                                ?.wallet_balance,
                                            currencySymbolDirection,
                                            currencySymbol,
                                            digitAfterDecimalPoint
                                        )
                                    )}
                                </Typography>
                                <Stack flexDirection="row" justifyContent="space-between">
                                    <Typography
                                        fontSize="12px"
                                        fontWeight="400"
                                        lineHeight={0}
                                        color={theme.palette.neutral[100]}
                                    >
                                        {t('Total Balance')}
                                    </Typography>
                                    {global?.digital_payment &&
                                        <Button
                                            sx={{
                                                backgroundColor: (theme) =>
                                                    theme.palette.neutral[100],
                                                minWidth: "101px",
                                                color: (theme) =>
                                                    theme.palette.neutral[700],
                                                cursor: 'pointer',
                                                direction: 'row',
                                                alignItems: 'center',
                                                gap: 1,
                                                zIndex: 99,
                                                '&:hover': {
                                                    backgroundColor: (theme) =>
                                                        theme.palette.neutral[300],
                                                },
                                            }}
                                            onClick={() => setOpen(!open)}
                                        >
                                            <Typography
                                                component="span"
                                                fontWeight="600"
                                                fontSize="14px"
                                                color={theme.palette.neutral[1000]}
                                            >
                                                {t('Add fund')}
                                            </Typography>
                                        </Button>}
                                </Stack>
                                <CustomPopover
                                    anchorEl={anchorEl}
                                    setAnchorEl={setAnchorEl}
                                    handleClose={handleClosePopover}
                                    maxWidth="525px"
                                    padding="18px 24px 26px"
                                >
                                    <HowToUse />
                                </CustomPopover>

                            </CustomStackFullWidth>
                            <CustomModal
                                openModal={open}
                                setModalOpen={setOpen}
                                bgColor={theme.palette.customColor.ten}
                            >
                                <Box
                                    sx={{
                                        p: { xs: '24px' },
                                        paddingBlock: { sm: '41px 27px' },

                                        borderRadius: '10px',
                                    }}
                                >
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="closebtn"
                                    >
                                        <CloseIcon sx={{ fontSize: '16px' }} />
                                    </button>
                                    <Box textAlign="center" mb={4}>
                                        <Typography
                                            variant="h5"
                                            mb={1}
                                            color={theme.palette.neutral[900]}
                                        >
                                            {t('Add Fund to Wallet')}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color={theme.palette.neutral[900]}
                                        >
                                            {t(
                                                'Add fund by from secured digital payment gateways'
                                            )}
                                        </Typography>
                                    </Box>
                                    <form onSubmit={formik.handleSubmit}>
                                        <CustomOutlinedInput
                                            variant="outlined"
                                            name="amount"
                                            id="amount"
                                            type="number"
                                            placeholder={t('Enter Amount')}
                                            value={formik.values.amount}
                                            onChange={formik.handleChange}
                                            error={formik.touched.amount && Boolean(formik.errors.amount)}
                                            helperText={formik.touched.amount && formik.errors.amount}
                                            onKeyPress={(event) => {
                                                if (event?.key === '-' || event?.key === '+') {
                                                    event.preventDefault();
                                                }
                                            }}
                                            />
                                        <Box mt={3}>
                                            <Typography
                                                variant="body1"
                                                fontWeight="600"
                                                mb={2}
                                                color={
                                                    theme.palette.neutral[900]
                                                }
                                            >
                                                {t('Payment Methods')}
                                                <Typography
                                                    variant="body1"
                                                    component="span"
                                                    sx={{ fontSize: '12px' }}
                                                    color={
                                                        theme.palette
                                                            .neutral[900]
                                                    }
                                                >
                                                    (
                                                    {t(
                                                        'Faster & secure way to pay bill'
                                                    )}
                                                    )
                                                </Typography>
                                            </Typography>
                                            <Stack>
                                                {global?.active_payment_method_list?.map(
                                                    (item, i) => (
                                                        <addFundIsLoading
                                                            key={
                                                                item?.gateway
                                                            }
                                                        >
                                                            <CustomRadioBox>
                                                                <label
                                                                    className={
                                                                        value ===
                                                                        item.gateway
                                                                            ? 'active'
                                                                            : ''
                                                                    }
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        name="payment_method"
                                                                        value={
                                                                            item?.gateway
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            setValue(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                            formik.handleChange(
                                                                                e
                                                                            )
                                                                        }}
                                                                        style={{
                                                                            display:
                                                                                'none',
                                                                        }}
                                                                    />
                                                                    {value ===
                                                                    item.gateway ? (
                                                                        <CheckCircle />
                                                                    ) : (
                                                                        <Box
                                                                            sx={{
                                                                                width: '18px',
                                                                                borderRadius:
                                                                                    '50%',
                                                                                aspectRatio:
                                                                                    '1',
                                                                                border: `1px solid ${theme.palette.divider}`,
                                                                            }}
                                                                        />
                                                                    )}
                                                                    <Stack
                                                                        direction="row"
                                                                        gap={
                                                                            1
                                                                        }
                                                                        sx={{
                                                                            img: {
                                                                                height: '24px',
                                                                                width: 'unset',
                                                                            },
                                                                        }}
                                                                    >
                                                                        {item?.gateway_image && (
                                                                            <img
                                                                                src={`${base_url}/${item?.gateway_image}`}
                                                                            />
                                                                        )}
                                                                        <Box
                                                                            sx={{
                                                                                color: (
                                                                                    theme
                                                                                ) =>
                                                                                    theme
                                                                                        .palette
                                                                                        .neutral[1000],
                                                                            }}
                                                                        >
                                                                            {
                                                                                item?.gateway_title
                                                                            }
                                                                        </Box>
                                                                    </Stack>
                                                                </label>
                                                            </CustomRadioBox>
                                                        </addFundIsLoading>
                                                    )
                                                )}
                                            </Stack>
                                        </Box>
                                        <Box mt={4}>
                                            <Button
                                                variant="contained"
                                                backgroundColor={
                                                    theme.palette.primary.main
                                                }
                                                fullWidth
                                                height="50px"
                                                type="submit"
                                                loading={addFundIsLoading}
                                                disabled={formik.values.amount===""}
                                            >
                                                <Typography
                                                    color={
                                                        theme.palette
                                                            .neutral[100]
                                                    }
                                                >
                                                    {' '}
                                                    {t('Add fund')}
                                                </Typography>
                                            </Button>
                                        </Box>
                                    </form>
                                </Box>
                            </CustomModal>
                        </WalletBox>
                    </Grid>
                    {walleBonus?.length === 0 ? (
                        <Grid item sm={12} xs={12} md={7.5}>
                            <HowToUse />
                        </Grid>
                    ) : (
                        <Grid item sm={12} xs={12} md={7.5}>
                            <WalletFundBonus walleBonus={walleBonus} isLoading={walletBonusIsLoading} />
                        </Grid>
                    )}
                    <Grid item md={12} xs={12}>
                        <Box
                            sx={{
                                padding: '10px',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography fontSize={{xs:"14px",sm:"16px" }} fontWeight="500">
                                {t('Wallet History')}
                            </Typography>
                            {page != 'loyalty' && (
                                <CustomSelect
                                    value={transactionType}
                                    onChange={(e) => handleChange(e)}
                                    sx={{fontSize:"12px"}}
                                >
                                    {transaction_options?.map((item, i) => (
                                        <MenuItem key={i} value={item?.value}   sx={{fontSize:"12px"}} >
                                            {t(item?.label)}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            )}
                        </Box>
                        {/* <ScrollerProvider maxHeight="40vh"> */}
                        {data ? (
                            data?.data?.data?.map((wallet) => (
                                <WalletsPage
                                    key={wallet.id}
                                    data={wallet}
                                    currencySymbolDirection={
                                        currencySymbolDirection
                                    }
                                    currencySymbol={currencySymbol}
                                    digitAfterDecimalPoint={
                                        digitAfterDecimalPoint
                                    }
                                />
                            ))
                        ) : (
                            <div
                                style={{
                                    textAlign: 'center',
                                    fontSize: 20,
                                }}
                            >
                                <WalletShimmer />
                            </div>
                        )}
                        {/* </ScrollerProvider> */}
                        {data?.data?.data?.length === 0 && (

                            <CustomEmptyResult
                                label='No Transaction History'
                                image={noTransactionFound}
                                height="50px"
                                width="60px"
                            />
                        )}
                        <CustomStackFullWidth
                            sx={{ height: '50px' }}
                            alignItems="center"
                            justifyContent="center"
                        >
                            {data && data?.data?.total_size >= page_limit && (
                                <CustomePagination
                                    offset={offset}
                                    page_limit={page_limit}
                                    setOffset={setOffset}
                                    total_size={data?.data?.total_size}
                                />
                            )}
                        </CustomStackFullWidth>
                    </Grid>
                </Grid>
            </CustomPaperBigCard >
        </>
    )
}

export default Wallet
export const CustomRadioBox = styled(Box)(({ theme, type }) => ({
    label: {
        display: 'flex',
        alignItems: 'center',
        gap: '21px',
        cursor: 'pointer',
        '.MuiSvgIcon-root': {
            width: '18px',
            height: '18px',
            color: theme.palette.primary.main,
        },
        '>.MuiStack-root': {
            width: '0',
            flexGrow: '1',
        },
        padding: '8px 30px',
        borderRadius: '10px',
        '&.active': {
            background: theme.palette.background.custom3,
        },
    },
}))

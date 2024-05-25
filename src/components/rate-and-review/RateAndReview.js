import React, { useEffect, useState } from 'react';
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from "@/styled-components/CustomStyles.style";
import GroupButtonsRateAndReview from './GroupButtonsRateAndReview';
import ItemForm from './ItemForm';
import { useQuery } from 'react-query';
import { OrderApi } from "@/hooks/react-query/config/orderApi";
import { useRouter } from 'next/router';
import Shimmer from './Shimmer';
import { useSelector } from 'react-redux';
import DeliverymanForm from './DeliverymanForm';
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import { CustomToaster } from "@/components/custom-toaster/CustomToaster";
import FeedBackSvg from "@/components/rate-and-review/FeedBackSvg";
import { Stack } from "@mui/system";
import CustomEmptyResult from "@/components/empty-view/CustomEmptyResult";
const RateAndReview = ({ id, onClose, refetchTrackData, is_reviewed,is_dm_reviewed }) => {
    const { deliveryManInfo } = useSelector((state) => state.searchFilterStore);
    const [type, setType] = useState('items');
    const [reviewItems, setReviewItems] = useState(null);
    const [completeReview, setCompleteReview] = useState(false);
    const [reviewedItem,setReviewedItem]=useState()
    const router = useRouter();
    const {
        isLoading,
        data,
        isError,
        error,
        refetch: refetchOrderReview,
    } = useQuery(['order-review', id], () => OrderApi.orderReview(id));

    useEffect(() => {
        id && refetchOrderReview();
    }, [id]);

    useEffect(() => {
        setReviewItems(data?.data?.details);
    }, [data]);

    const notNow = (reviewId) => {
        const tempData = reviewItems?.filter((review) => review?.id !== reviewId);
        setReviewItems(tempData);
    };

    useEffect(() => {
        const tempData=reviewItems?.filter((review)=>review?.id!==reviewedItem?.id)
        setReviewItems(tempData)

    }, [reviewedItem]);
    useEffect(() => {

        if (reviewItems?.length === 0 && is_dm_reviewed ) {
            setCompleteReview(true);
            onClose();

        } else if ( !deliveryManInfo && reviewItems?.length === 0 ){

            //setCompleteReview(true);
            onClose();
        }
    }, [reviewItems,is_dm_reviewed,deliveryManInfo]);

    useEffect(() => {
        if (is_reviewed && completeReview && is_dm_reviewed) {
            CustomToaster("success",
                "Thanks For Your Feedback!",
                "If you want to order more items please explore our site.",
                <FeedBackSvg/>,
                false,
                true
                );
        } else if(is_reviewed && completeReview){
            CustomToaster("success",
                "Thanks For Your Feedback!",
                "If you want to order more items please explore our site.",
                <FeedBackSvg/>,
                false,
                true
            );  
        }
    }, [completeReview,is_dm_reviewed,is_reviewed]);
    useEffect(() => {
        if(is_reviewed || reviewItems?.length === 0){
            setType("delivery_man")
        }else{
            if(is_dm_reviewed || !deliveryManInfo){
                setType("items")
            }
        }

    }, [is_reviewed,is_dm_reviewed,reviewItems,deliveryManInfo]);

    return (
        <CustomStackFullWidth
            alignItems="center"
            justifyContent="center"
            spacing={2}
            mt="9rem"
            mb="2rem"
        >
            {deliveryManInfo && (
                <GroupButtonsRateAndReview deliveryManInfo={deliveryManInfo} reviewItemsIsEmpty={reviewItems} is_dm_reviewed={is_dm_reviewed} is_reviewed={is_reviewed} setType={setType} type={type} />
            )}
            <CustomStackFullWidth
                alignItems="center"
                justifyContent="center"
                spacing={3}
            >
                {type === 'items' ? (
                    isLoading ? (
                        <Shimmer />
                    ) : (
                        data?.data?.details?.length>0 ? (
                            reviewItems?.map((item, index) => (
                                <CustomPaperBigCard key={index}>
                                    <ItemForm
                                        data={item}
                                        id={id}
                                        notNow={notNow}
                                        refetchOrderReview={refetchOrderReview}
                                        refetchTrackData={refetchTrackData}
                                        setReviewedItem={setReviewedItem}
                                    />
                                </CustomPaperBigCard>
                            ))
                        ):(
                            <Stack width="100%"  justifyContent="center">
                             <CustomEmptyResult label="No Food"/>
                            </Stack>
                        )
                    )
                ) : (
                   <>
                       {!is_dm_reviewed && deliveryManInfo &&
                           <CustomPaperBigCard>
                             <DeliverymanForm onClose={onClose} data={deliveryManInfo} orderId={id} refetchTrackData={refetchTrackData} />
                          </CustomPaperBigCard>
                       }
                   </>
                )}
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    );
};

export default RateAndReview;

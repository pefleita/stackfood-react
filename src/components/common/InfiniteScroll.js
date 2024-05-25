import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import DotSpin from "../home/restaurant/DotSpin";


export const InfiniteScroll = ({
                                   data,
                                   isLoading,
                                   newData,
                                   setNewData,
                                   offset,
                                   setOffset,
                                   page_limit,
                                   isFetching,
                                   children,
                               }) => {

    useEffect(() => {
        if (!isLoading && data) {
            if (offset <= 1) {
                setNewData(data?.products);
            } else {
                setNewData([...newData, ...data?.products]);
            }
        }
    }, [data]);
    const { ref, inView } = useInView();

    useEffect(() => {

        if (inView) {
            if (!isLoading) {
                if (offset * page_limit <= data?.total_size) {
                    setOffset((prevState) => prevState + 1);
                }
            }
        }
    }, [inView]);
    return (
        <>
            {isFetching &&
                (children ? (
                    children
                ) : (
                    <>
                        <DotSpin height="400px" />
                    </>
                ))}
            <Box ref={ref} />
        </>
    );
};
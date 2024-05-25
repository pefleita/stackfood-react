import React, { useEffect, useRef, useState } from "react";

import { CustomStackFullWidth } from "@/styled-components/CustomStyles.style";
import FilterTag from "./FilterTag";
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import useScrollSticky from "./useScrollSticky";
import Card from "@mui/material/Card";
import CustomContainer from "../../container";
import { searchMockData } from "../../products-page/SearchMockData";
import {
  setFilterbyByCuisineDispatch,
  setFilterbyByDispatch,
  setPriceByDispatch,
  setRatingByDispatch, setSortbyByDispatch
} from "@/redux/slices/searchFilter";
import { setSearchTagData } from "@/redux/slices/searchTagSlice";
import { useScrollTrigger } from "@mui/material";

const SearchFilterTag = ({ tags ,query,page,sort_by,setSort_by}) => {
  const dispatch=useDispatch()
  const { offsetElementRef } = useScrollSticky();
  const {isSticky}=useSelector((state) => state.scrollPosition)
  const {searchTagData}=useSelector((state) => state.searchTags)
  const {categoryIsSticky}=useSelector((state) => state.scrollPosition)
  const { filterData } = useSelector((state) => state.searchFilterStore)
  const [storeData, setStoreData] = useState(searchMockData)
  const [isMount,setIsMount]=useState(false)
  const router = useRouter()
  const theme=useTheme()
  const scrolling = useScrollTrigger();
  useEffect(() => {
   dispatch(setSearchTagData(storeData))
  }, [searchMockData]);
  const handleClick = (value) => {
    if(value!=="sort_by"){
      let newArr;
      if (value === 'veg' || value === 'nonVeg') {
        // Toggle the isActive state for 'Veg' and 'Non-Veg' without affecting others
        newArr = searchTagData?.map((item) =>
            item.value === value
                ? { ...item, isActive: !item.isActive }
                : item.value === 'veg' || item.value === 'nonVeg'
                    ? { ...item, isActive: false }
                    : item
        );
      } else {
        // For other options, toggle the isActive state
        newArr = searchTagData?.map((item) =>
            item.value === value ? { ...item, isActive: !item.isActive } : item
        );
      }
      setIsMount(true);
      setStoreData(newArr)
    }

  };

  const handleSort=(value)=>{
    if(value!==''){
      setSort_by(value)
      const tempValue=value && "sort_by"
      let newArr = searchTagData?.map((item) =>
          item?.value === tempValue ? { ...item, isActive: true } : item
      )
      setIsMount(true)
      setStoreData(newArr)
    }



  }
  const activeFilters = storeData?.filter((item) => item.isActive === true)
  const handleFilterBy = () => {
    dispatch(setFilterbyByDispatch(activeFilters))
    dispatch(setSortbyByDispatch(sort_by))
    if(tags !== "search_tag" ){
      router.push(
          {
            pathname:
                router.pathname === '/home'
                    ? window.location.pathname
                    : '/search',
            query: {
              tags: "search_tag",
              query:query?query:""
            },
          },
          undefined,
          { shallow: router.pathname === '/home' ? true : false }
      )
    }

  }

  useEffect(() => {
    if(isMount){
      handleFilterBy()
    }
  }, [ storeData])

  useEffect(() => {
    dispatch(setSearchTagData(storeData));
  }, [ storeData,isMount]);

  useEffect(() => {
    if(query){
      setStoreData(searchMockData)
    }

  }, [query]);

  return (
    <CustomStackFullWidth ref={offsetElementRef}  spacing={2} sx={{position:"sticky",top:{xs:"45px",md:router.pathname !== "/home" ?"0px":"50px"},
      zIndex:{xs:1101,md:isSticky?1200:99}}}
    >
      <Card sx={{
        boxShadow: isSticky
          ? categoryIsSticky?"none":"0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)"
          : "none", // Change this value based on your non-sticky shadow style
        paddingBottom:"1rem",
        paddingTop:".5rem",
        background:theme=>theme.palette.neutral[1800],
        [theme.breakpoints.down('md')]: {
          paddingTop:".5rem",
          paddingBottom:".5rem",
        },
      }}>
        <CustomContainer>
          <FilterTag handleClick={handleClick}
                     query={query}
                     tags={tags}
                     storeData={storeData}
                     setStoreData={setStoreData}
                     handleSort={handleSort}
                     activeFilters={activeFilters}
                     page={page}
          />
        </CustomContainer>
      </Card>
    </CustomStackFullWidth>
  );
};

export default SearchFilterTag;
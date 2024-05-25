export const handleFilterData = (checkedFilterKey,setFilterByData,setOffSet,setForFilter) => {
    const activeFilters = checkedFilterKey.filter(
        (filter) => filter.isActive === true
    )

    const newFilteredData = {
        veg:
            activeFilters.find((filter) => filter?.value === 'veg') !==
            undefined,
        non_veg:
            activeFilters.find((filter) => filter.value === 'non_veg') !==
            undefined,
        top_rated:
            activeFilters.find((filter) => filter.value === 'top_rated') !==
            undefined,
        discount:
            activeFilters.find((filter) => filter.value === 'discount') !==
            undefined,
        new:activeFilters.find((filter) => filter.value === 'latest') !==
            undefined,
        take_away:activeFilters.find((filter) => filter.value === 'take_away') !==
            undefined,
        delivery:activeFilters.find((filter) => filter.value === 'delivery') !==
            undefined,
    }
    setFilterByData(newFilteredData)
    //handleDropClose()
    setOffSet(1)
    setForFilter(true)
    //window.scrollTo(0, responsiveTop)
}
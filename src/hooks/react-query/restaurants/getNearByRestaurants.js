import MainApi from '../../../api/MainApi'

export const RestaurantsApiNearBy = {
    restaurants: ({ type, offset, page_limit, filterType, searchKey,filterByData,priceAndRating }) => {
        return MainApi.get(
            `/api/v1/restaurants/get-restaurants/all?filter_data=${filterType}&name=${searchKey}&offset=${offset}&limit=${page_limit}&veg=${
                filterByData?.veg ? 1 : 0
            }&non_veg=${filterByData?.non_veg ? 1 : 0}&delivery=${filterByData?.delivery?1:0}&takeaway=${filterByData?.take_away?1:0}`
        )
    },

}

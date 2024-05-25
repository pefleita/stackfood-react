import MainApi from '../../../api/MainApi'

export const CategoryApi = {
    categories: (searchKey) => {

        if (searchKey && searchKey !== '') {
            return MainApi.get(`/api/v1/categories?name=${searchKey}`)
        } else {
            return MainApi.get(`/api/v1/categories`)
        }
    },
    // childCategories: (id) => MainApi.get(`categories/childes/${id}`)

    categoriesDetails: (id, type, offset, page_limit,filterByData,priceAndRating) => {
        const tempPrice=JSON.stringify(priceAndRating?.price)
        return MainApi.get(
            `/api/v1/categories/products/${id}?limit=${page_limit}&offset=${offset}&type=${type}&top_rated=${filterByData?.top_rated?1:0}&veg=${filterByData?.veg?1:0}&non_veg=${filterByData?.non_veg?1:0}
            &avg_rating=${priceAndRating?.rating===null? 0:priceAndRating?.rating}&price=${tempPrice}
            `
        )
    },
    categoriesChildes: (id) => {
        return MainApi.get(`/api/v1/categories/childes/${id}`)
    },
    categoriesDetailsForRes: (id, type, offset, page_limit,filterByData,priceAndRating) => {
        return MainApi.get(
            `/api/v1/categories/restaurants/${id}?limit=${page_limit}&offset=${offset}&type=${type}&top_rated=${filterByData?.top_rated?1:0}&veg=${filterByData?.veg?1:0}&non_veg=${filterByData?.non_veg?1:0}&avg_rating=${priceAndRating?.rating===null?0:priceAndRating?.rating}`
        )
    },
}

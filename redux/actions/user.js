import http from "../../helpers/http";

export const getUser = async (dispatch) => {
    try {
        dispatch({type: 'TOGGLE_LOADING_TRUE'})        
        const {data} = await http().get('/api/?results=50')
        dispatch({type: 'GET_USER', payload: data.results})
        dispatch({type: 'TOGGLE_LOADING_FALSE'}) 
    } catch (e) {
        console.log(e)
    }
}

export const getUserSearch = async (dispatch) => {
    try {
        dispatch({type: 'TOGGLE_LOADING_TRUE'})        
        const {data} = await http().get(`/api/?results=50&search=${search}`)
        dispatch({type: 'GET_USER', payload: data.results})
        dispatch({type: 'TOGGLE_LOADING_FALSE'}) 
    } catch (e) {
        console.log(e)
    }
}
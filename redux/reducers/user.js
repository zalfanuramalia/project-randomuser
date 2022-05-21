const userRandom = {
    data: [],
}

const user = (state = userRandom, action) => {
    switch(action.type) {
        case 'GET_USER' : {
            const data = action.payload
            state.data = data
            if(!Array.isArray(data)){
                state.data = [data]
            }
            return {...state }
        }
        default: {
            return {...state }
        }
    }
}

export default user
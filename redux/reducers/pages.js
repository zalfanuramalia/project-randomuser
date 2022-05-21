const initialState = {
    isLoading: false
  }
  
  const pages = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_LOADING_TRUE': {
        let { isLoading } = state
        isLoading = true
        return { ...state }
      }
      case 'TOGGLE_LOADING_FALSE': {
        let { isLoading } = state
        isLoading = false
        return { ...state }
      }
      default: {
        return { ...state }
      }
    }
  }
  
  export default pages
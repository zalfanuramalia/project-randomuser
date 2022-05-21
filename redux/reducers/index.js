import { combineReducers } from "redux";
import pages from "./pages"
import user from "./user";

const rootReducers = combineReducers({
    pages,
    user,
})

export default rootReducers
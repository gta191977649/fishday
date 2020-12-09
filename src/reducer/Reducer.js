import { ADD_COLLECTIONS } from "../action/Actions"

const AppReducer= (states={},action) => {
    switch(action.type) {
        case ADD_COLLECTIONS:{
            return { name:"added collections" }
        }
        default: {
            return state
        }
    }
}

export default AppReducer
const INTIAL_STATE = {
    lang : 'AR'
}
export default function languageReducer (state = INTIAL_STATE,action){
    switch (action.type) {
        case 'CHANGE_LANG':
            
            return {...state,lang:action.payload};
    
        default:
            return {...state};
    }

}
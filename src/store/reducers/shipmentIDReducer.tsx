const INTIAL_STATE = {
    shipmentId : 7234258
}

export default function ShipmentIDReducer (state = INTIAL_STATE,action){
    switch (action.type) {
        case 'SET_ID':
            
            return {...state,shipmentId:action.payload};
    
        default:
            return {...state};
    }

}
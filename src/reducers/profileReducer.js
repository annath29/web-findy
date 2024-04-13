
const profileReducer = (state,action)=>{
    switch (action.type) {
        
        case 'SETPROFILE':
            return{
                ...state,
                profile: action.payload
            }
        case 'EDITPROFILE':
            const editProfile=action.payload//editprofile={}
            return{
                ...state,
                profile: editProfile
            }
        // case 'FOLLOWPROFILE':
        //     const editProfile=action.payload//editprofile={}
        //     return{
        //         ...state,
        //         profile: editProfile
        //     }
        default:
            return state;
    }
}

export default profileReducer
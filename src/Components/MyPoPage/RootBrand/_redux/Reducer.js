import * as Types from "./Types";

//initialization
const initialState = {
  profile_picture:{}
 
};
const userTypeReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
  
    case Types.get_profile_picture:   
    return {
      ...state,
      profile_picture: action.payload,
    };
    case Types.update_profile_picture:   
    return {
      ...state,
      profile_picture: action.payload,
    };
    case Types.delete_profile_picture:   
    return {
      ...state,
      profile_picture: {},
    };
        
    

 

     
    default:
      break;
  }

  return newState;
};
export default userTypeReducer;

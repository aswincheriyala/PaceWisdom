const INITIAL_STATE = {
  newFields: {
    name: '',
    email: '',
    phone: '',
    photo: null,
    location: null,
    address: [],
  },
  list: null,
  loading: false,
  error: {
    name: false,
    email: false,
    phone: false,
    address: false,
  },
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        list: action.payload,
        newFields: state.newFields,
        loading: false,
      };
    case 'SET_LOADER':
      return {
        ...state,
        loading: true,
      };
    case 'SET_LOCATION':
      return {
        ...state,
        newFields: {
          ...state.newFields,
          location: action.payload.location,
          address: action.payload.address,
        },
      };
    case 'SET_USER':
      return {
        ...state,
        newFields: action.payload,
        error: INITIAL_STATE.error,
      };
    case 'CLEAR_USER':
      return {
        ...state,
        newFields: INITIAL_STATE.newFields,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

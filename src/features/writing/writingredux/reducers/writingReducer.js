import { UPDATE_WRITING_INPUT, RESET_WRITING_INPUTS } from '../actions/writingActions';

const initialState = {
  inputs: {} // Structure: { partId: { questionId: value } }
};

const writingReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WRITING_INPUT: {
      const { partId, questionId, value } = action.payload;
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [partId]: {
            ...state.inputs[partId],
            [questionId]: value
          }
        }
      };
    }
    case RESET_WRITING_INPUTS:
      return initialState;
    default:
      return state;
  }
};

export default writingReducer; 
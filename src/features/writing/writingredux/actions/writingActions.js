// Action Types
export const UPDATE_WRITING_INPUT = 'UPDATE_WRITING_INPUT';
export const RESET_WRITING_INPUTS = 'RESET_WRITING_INPUTS';

// Action Creators
export const updateWritingInput = (partId, questionId, value) => ({
  type: UPDATE_WRITING_INPUT,
  payload: {
    partId,
    questionId,
    value
  }
});

export const resetWritingInputs = () => ({
  type: RESET_WRITING_INPUTS
}); 
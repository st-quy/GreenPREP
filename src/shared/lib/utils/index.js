export const yupSync = (schema) => ({
  async validator({ field }, value) {
    try {
      await schema.validateAt(field, { [field]: value });
    } catch (error) {
      return Promise.reject(new Error(error.message));
    }
  },
});


export const transformData = (data) => {
  const result = [];

  Object.entries(data).forEach(([questionId, answer]) => {
    // Trường hợp dropdown-list || matching
    if (Array.isArray(answer) && answer[0]?.left && answer[0]?.right) {
      const answerText = answer.map(({ left, right }) => ({
        key: left,
        value: right
      }));

      result.push({
        questionId,
        answerText,
        answerAudio: null
      });
    }
    // Trường hợp multiple-choice dạng array
    else if (Array.isArray(answer) && answer[0]?.key && answer[0]?.value) {
      const answerText = answer.map((item, index) => ({
        ID: index + 1,
        answer: item.value
      }));

      result.push({
        questionId,
        answerText,
        answerAudio: null
      });
    }
    // Trường hợp multiple-choice dạng đơn hoặc writing
    else if (typeof answer === 'string') {
      result.push({
        questionId,
        answerText: answer,
        answerAudio: null
      });
    }
  });

  return result;
}
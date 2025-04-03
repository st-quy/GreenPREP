export const yupSync = (schema) => ({
  async validator({ field }, value) {
    try {
      await schema.validateAt(field, { [field]: value });
    } catch (error) {
      return Promise.reject(new Error(error.message));
    }
  },
});

export const validateForm = (validations, data) => {
    for(const validation of validations) {
        const result = validation.safeParse(data);
        if(!result.success) {
            throw {
                name: 'app',
                message: result.error.errors[0].message,
            }
        }
    }
};
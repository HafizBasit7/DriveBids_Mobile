export function validateEmailAndPassword(email, password) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Invalid email address' };
    }
  
    if (!passwordRegex.test(password)) {
      return { isValid: false, error: 'Invalid password. Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.' };
    }
  
    return { isValid: true };
  }
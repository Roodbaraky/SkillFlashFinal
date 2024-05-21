export interface IsError {
  username?: string;
  password?: string;
  email?: string;
  confirmPassword?: string;
}

export function checkField(field:string, setIsError: Function, valueInput: string) {
  const passRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*?&]).{8,}$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (field === "username" && valueInput.length < 3) {
    setIsError((currentError: IsError) => {
      return { ...currentError, username: "Please enter a valid username" };
    });
  }
  if (field === "password" && !passRegex.test(valueInput)) {
    setIsError((currentError: IsError) => {
      return { ...currentError, password: "Please enter a valid password" };
    });
  }
  if (field === "confirmPassword" && !valueInput) {
    setIsError((currentError: IsError) => {
      return {
        ...currentError,
        confirmPassword: "Please confirm your password",
      };
    });
  }
  if (field === "email" && !emailRegex.test(valueInput)) {
    setIsError((currentError: IsError) => {
      return { ...currentError, email: "Please enter a valid email" };
    });
  }
}

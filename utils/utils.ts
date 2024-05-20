export interface IsError {
  username?: string;
  password?: string;
  email?: string;
  confirmPassword?: string;
}

export function checkField(e, setIsError, valueInput) {
  const passRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*?&]).{8,}$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (e.target.id === "username" && valueInput.length < 3) {
    setIsError((currentError: IsError) => {
      console.log(currentError);
      return { ...currentError, username: "Please enter a valid username" };
    });

  }
  if (e.target.id === "password" && !passRegex.test(valueInput)) {
    setIsError((currentError: IsError) => {
      return { ...currentError, password: "Please enter a valid password" };
    });

  }
  if (e.target.id === "confirmPassword" && !valueInput) {
    setIsError((currentError: IsError) => {
      return {
        ...currentError,
        confirmPassword: "Please confirm your password",
      };
    });

  }
  if (e.target.id === "email" && !emailRegex.test(valueInput)) {
    setIsError((currentError: IsError) => {
      return { ...currentError, email: "Please enter a valid email" };
    });

  }
  
}

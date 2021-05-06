export interface AuthErrorAttributes {
  response: {
    status: number;
  };
}

export function AuthError(error: AuthErrorAttributes): string {
  switch (error.response.status) {
    case 401 :
    case 400 :
      return "E-mail ou senha incorretos.";
    default :
      return "Ocorreu um erro, tente novamente mais tarde."
  }
}

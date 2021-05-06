export interface AuthErrorAttributes {
  response: {
    status: number;
  };
}

export function AuthError(error: AuthErrorAttributes): string {
  switch (error.response.status) {
    case 400:
    case 401:
      return "E-mail ou senha incorretos.";
    default :
      return "Ocorreu um erro, tente novamente mais tarde."
  }
}

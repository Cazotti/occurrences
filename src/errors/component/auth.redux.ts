export interface AuthErrorAttributes {
  response: {
    status: number;
  };
}

export function AuthError(error: AuthErrorAttributes): string {
  if (!error.response) {
    return "";
  }
  switch (error.response.status) {
    case 400:
      return "E-mail ou senha incorretos.";
    default :
      return "Ocorreu um erro, tente novamente mais tarde."
  }
}

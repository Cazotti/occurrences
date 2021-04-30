export interface OccurrenceErrorAttributes {
  response: {
    status: number;
  };
}

export function OccurrenceError(error: OccurrenceErrorAttributes): string {
  switch (error.response.status) {
    case 500:
      return "Ocorreu um erro interno, tente novamente mais tarde";
    default :
      return "Ocorreu um erro, tente novamente mais tarde."
  }
}

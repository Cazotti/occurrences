export const dateFormat = (date: string): string  => {
  const data = new Date(date);
  const formattedDate = ((data.getDate() + 1)) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
  return formattedDate;
}


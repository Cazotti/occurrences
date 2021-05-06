export const dateFormat = (date: string): string  => {
  const data = new Date(date);
  const formattedDate = addZero(data.getDate()) + "/" + (addZero(data.getMonth()+1)) + "/" + data.getFullYear();
  return formattedDate;
}

function addZero(num: number){
  if (num < 10) return "0" + num;
  return num;
}


export const getCurrentMonth = () => {
  const date= new Date()
  const month=("0" + (date.getMonth() + 1)).slice(-2)
  const year=date.getFullYear()
  return `${year}-${month}`;
}

export const getLastDay = (date) => {
  const month = date.split("-")[1]
  const year = date.split('-')[0]
  return  new Date(year, month, 0).getDate();
}

export const convertDate = (date) => {
  const month = date.split("-")[1];
  const year = date.split("-")[0]
  return `${month}_${year}`
}
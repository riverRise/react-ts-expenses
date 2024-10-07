export const capitalise = (word: string) => {
  const firstLetter = word.charAt(0).toUpperCase();
  return firstLetter + word.slice(1);
}

export const handleDate = (date: string) => {
  const newDate = new Date(date)
  const prettyDate = new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    day: 'numeric'
  }).format(newDate);
  return prettyDate;
}
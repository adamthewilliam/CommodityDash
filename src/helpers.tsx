export function convertTimestampToFormattedDatetime(timestamp?: string): string | undefined {
    if(!timestamp) {
        return undefined;
    }

    const dateTime = new Date(Number(timestamp) * 1000);

    if(isNaN(dateTime.getTime())) {
        return undefined;
    }

    return dateTime.toLocaleString();
}   

export function getDateNDaysAgo(numDays: number): string {
  const today = new Date();
  today.setDate(today.getDate() - numDays);

  const year = today.getUTCFullYear();
  const month = String(today.getUTCMonth() + 1).padStart(2, '0');
  const day = String(today.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
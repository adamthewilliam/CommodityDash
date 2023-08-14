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

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getDatesInRange(startDate: Date, endDate: Date): string[] {
  const dates: string[] = [];
  const currentDate = startDate;

  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    dates.push(`${year}-${month}-${day}`);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
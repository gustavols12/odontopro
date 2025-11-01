export function isToday(date: Date) {
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

/**
 * Verificar se determinado slot já passou
 */
export function isSlotInThePast(sloTime: string) {
  const [slotHour, slotMinute] = sloTime.split(":").map(Number);

  const now = new Date();

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  if (slotHour < currentHour) {
    return true;
  } else if (slotHour === currentHour && slotMinute <= currentMinute) {
  }
}

export const getDatesInRange = (
  startDate: Date,
  endDate: Date,
  recurrence: string,
  dayOfWeek?: string,
  dayOfMonth?: number
): Date[] => {
  if (recurrence === "Daily") {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
  if (recurrence === "Weekly" && dayOfWeek) {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      const weekday = currentDate.toLocaleString("en-US", {
        weekday: "short",
        timeZone: "UTC",
      });
      if (weekday === dayOfWeek) {
        dates.push(new Date(currentDate));
      }
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
    return dates;
  }

  if (recurrence === "Monthly" && dayOfMonth) {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      const targetDate = new Date(
        Date.UTC(
          currentDate.getUTCFullYear(),
          currentDate.getUTCMonth(),
          dayOfMonth
        )
      );
      if (
        targetDate >= new Date(startDate) &&
        targetDate <= new Date(endDate)
      ) {
        dates.push(targetDate);
      }

      currentDate.setUTCMonth(currentDate.getUTCMonth() + 1);
    }
    return dates;
  }
  return [];
};

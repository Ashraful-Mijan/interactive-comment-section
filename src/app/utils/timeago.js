function timeAgo(date) {
  const currentDate = new Date();
  const millisecondsDiff = currentDate - date;
  const secondsDiff = millisecondsDiff / 1000;
  const minutesDiff = secondsDiff / 60;
  const hoursDiff = minutesDiff / 60;
  const daysDiff = hoursDiff / 24;
  const weeksDiff = daysDiff / 7;
  const monthsDiff = daysDiff / 30;
  const yearsDiff = daysDiff / 365;

  if (secondsDiff < 60) {
    return (
      Math.round(secondsDiff) +
      ` second${Math.round(secondsDiff) > 1 ? "s" : ""} ago`
    );
  } else if (minutesDiff < 60) {
    return (
      Math.round(minutesDiff) +
      ` minute${Math.round(minutesDiff) > 1 ? "s" : ""} ago`
    );
  } else if (hoursDiff < 24) {
    return (
      Math.round(hoursDiff) + ` hour${Math.round(hoursDiff) > 1 ? "s" : ""} ago`
    );
  } else if (daysDiff < 7) {
    return (
      Math.round(daysDiff) + ` day${Math.round(daysDiff) > 1 ? "s" : ""} ago`
    );
  } else if (weeksDiff < 4) {
    return (
      Math.round(weeksDiff) + ` week${Math.round(daysDiff) > 1 ? "s" : ""} ago`
    );
  } else if (monthsDiff < 12) {
    return (
      Math.round(monthsDiff) +
      ` month${Math.round(monthsDiff) > 1 ? "s" : ""} ago`
    );
  } else {
    return (
      Math.round(yearsDiff) + ` year${Math.round(yearsDiff) > 1 ? "s" : ""} ago`
    );
  }
}

export default timeAgo;

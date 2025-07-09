export function formatDateTime(dateString) {
    const date = new Date(dateString);
  
    // Format options
    const options = {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
  
    // Convert to desired format
    const formattedDate = date.toLocaleString("en-US", options);
  
    // Replace comma to match the requested format
    return formattedDate.replace(",", " at");
}

export function formatAmount (amount) {
  return amount.toLocaleString();
}

export function timeAgo(utcString) {
  const now = new Date();
  const past = new Date(utcString);
  const seconds = Math.floor((now - past) / 1000);

  const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
  };

  for (const [key, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value);
      if (count >= 1) {
          return `${count} ${key}${count > 1 ? "s" : ""} ago`;
      }
  }
  return "Just now";
}


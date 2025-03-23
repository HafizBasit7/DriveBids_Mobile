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
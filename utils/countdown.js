export const calculateTimeLeft = (targetDate) => {
    const now = new Date().getTime();
    const difference = new Date(targetDate) - now;

    if (difference <= 0) {
        return 'Ended';
    }

    const days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0");
    const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0");
    const minutes = String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, "0");

    return `${days}d:${hours}hr:${minutes}m:${seconds}s`
};
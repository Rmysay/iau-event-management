export const getCapacityPct = (booked, seats) => Math.round((booked / seats) * 100)

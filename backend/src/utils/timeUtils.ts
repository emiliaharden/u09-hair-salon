export const toUTC = (localTime: string | Date): Date => {
  const date = new Date(localTime);
  return new Date(date.toISOString());
};

export const toISO = (date: Date | string): string => {
  return new Date(date).toISOString();
};

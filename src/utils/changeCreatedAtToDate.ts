export const changeCreatedAtToDate = (createdAt: string) => {
  const [yearMonthDate] = createdAt.split('T');
  return yearMonthDate.replace(/-/g, '.');
};

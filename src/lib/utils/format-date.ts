export const formatDate = (value: string | Date) =>
  new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
  }).format(new Date(value));

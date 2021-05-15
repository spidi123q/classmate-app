export const handleApiError = (response: any, oneError?: () => any) => {
  if (response.error) {
    oneError && oneError();
    throw response.error;
  }
};

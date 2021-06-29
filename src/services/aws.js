export const executeAWSRequest = async (fn) => {
  try {
    const {
      $response: { data, error },
    } = await fn.promise();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('AWS Request Error: ', error);
    throw new Error(error);
  }
};

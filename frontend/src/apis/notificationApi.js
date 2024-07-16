const BASR_URL = "http://localhost:4000/Notification";

export const getNotifications = async () => {
  try {
    const response = await fetch(`${BASR_URL}/getNotification`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const postRead = async () => {
  try {
    const response = await fetch(`${BASR_URL}/postRead`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

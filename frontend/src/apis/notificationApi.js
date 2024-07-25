const BASR_URL = "http://localhost:4000/Notification";

export const getNotifications = async (idUser) => {
  try {
    const response = await fetch(`${BASR_URL}/getNotification/${idUser}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
export const getAdminNotifications = async () => {
  try {
    const response = await fetch(`${BASR_URL}/getAdminNotifications`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const postRead = async (idUser) => {
  try {
    const response = await fetch(`${BASR_URL}/postRead/${idUser}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

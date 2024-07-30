import toast from "react-hot-toast";

const BASR_URL = "http://localhost:4000/NewsLetter";

export const subscribeNewsLetter = async (email) => {
  try {
    console.log(email);
    const data = { email };
    const response = await fetch(`${BASR_URL}/subscribeNewsLetter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
};

export const postNewsLetter = async (data) => {
  try {
    const response = await fetch(`${BASR_URL}/postNewsLetter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

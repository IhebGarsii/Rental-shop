const BASR_URL = "http://localhost:4000/Payment";

export const pay = async (data) => {
  try {
    const response = await fetch(`${BASR_URL}/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error;
  }
};

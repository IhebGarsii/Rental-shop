const BASE_URL = "http://localhost:4000/User";
export const signin = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const login = await response.json();
    if (!response.ok) {
      // If the response is not ok, throw an error with the status text
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return { ok: true, ...login };
  } catch (error) {
    console.error(error);

    return { ok: false, error: error.message };
  }
};

export const signup = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",

      body: formData,
    });
    console.log(response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getAllUsers`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getUser = async (idUser) => {
  try {
    const response = await fetch(`${BASE_URL}/getUser/${idUser}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const blockUser = async (idUser) => {
  try {
    const response = await fetch(`${BASE_URL}/blockUser/${idUser}`, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const sendEmail = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/sendEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
};

export const passwordReset = async (email) => {
  console.log(email);
  try {
    const response = await fetch(`${BASE_URL}/passwordReset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

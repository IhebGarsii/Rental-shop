const BASE_URL = "http://localhost:4000/User";

export const signin = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const login = await response.json();
    return login;
  } catch (error) {
    console.error(error);
  }
};

export const signup = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",

      body: formData,
    });

    const user = await response.json();
    return user;
  } catch (error) {
    console.error(error);
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

export const blockUser = async (idUser
  
) => {
  try {
    const response = await fetch(`${BASE_URL}/blockUser/${idUser}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

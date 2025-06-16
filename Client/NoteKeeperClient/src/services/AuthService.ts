import axios from "axios";

export async function loginUser(usernameOrEmail: string, password: string) {
  const response = await axios.post("https://localhost:7001/api/Users/Login", {
    usernameOrEmail,
    password,
  });
  const { user } = response.data;

  localStorage.setItem("token", response.data.token.accessToken);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
}

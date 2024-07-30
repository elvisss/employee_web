const BASE_URL = "http://localhost:8080/api";

async function getEmployees() {
  const url = `${BASE_URL}/employee`;
  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text();
    console.log(text);
    throw Error(text);
  }

  const json = await response.json();
  return json;
}

async function createEmployee(firstName, lastName, email) {
  const url = `${BASE_URL}/employee`;
  const body = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await response.json();
  if (!response.ok) {
    const text = await response.text();
    console.log(text);
    throw Error(text);
  }
  return json;
}

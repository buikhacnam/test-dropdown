"use server";
const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY || "";
import { HttpMethod } from "@/constants/HttpMethod";

export async function fetchAction(
  apiPath: string,
  method: HttpMethod,
  body?: object
) {
  try {
    const response = await fetch(`${apiUrl}${apiPath}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(body),
    });

    let resObj = {
      data: [],
      error: "",
    };

    if (!response.ok) {
      resObj.error = "Error fetching data: " + response.statusText;
      return resObj;
    }

    try {
      const dataRes = (await response.json()) || [];
      resObj.data = dataRes;
    } catch (error) {}

    return resObj;
  } catch (error) {
    console.error("fetchAction error: ", error);
    return {
      data: [],
      error: 'Error fetching data'
    };
  }
}

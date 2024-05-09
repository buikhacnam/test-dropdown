"use server";
const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY || '';
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
        "X-API-Key": apiKey
      },
      body: JSON.stringify(body),
    });
    let data = [];
    try {
      data = (await response.json()) || [];
    } catch (error) {
    }
   
    return data;
  } catch (error) {
    console.error("fetchAction error: ", error);
  }
}

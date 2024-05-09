import CountryForm from "@/components/molecules/countryForm";
import { HttpMethod } from "@/constants/HttpMethod";

async function fetchCountries() {
  const apiUrl = process.env.API_URL;
  const apiKey = process.env.API_KEY || "";
  if (!apiUrl || !apiKey) {
    throw new Error("API_URL and API_KEY env must be set in .env file");
  }
  let error = "";
  let data = [];

  const res = await fetch(process.env.API_URL + "/countries", {
    method: HttpMethod.GET,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.API_KEY || "",
    },
  });
  if (!res.ok) {
    error = "Error fetching data: " + res.statusText;
  }
  try {
    data = (await res.json()) || [];
  } catch (error) {
  } finally {
    return {
      data,
      error,
    };
  }
}

export default async function Home() {
  const countriesObj = await fetchCountries();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CountryForm countries={countriesObj.data} error={countriesObj.error} />
    </main>
  );
}

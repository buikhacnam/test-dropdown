"use client";

import { fetchAction } from "@/app/actions/fetchAction";
import { HttpMethod } from "@/constants/HttpMethod";
import { useEffect, useState } from "react";
import { Item, SelectScrollable } from "../ui/selectScrollable";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

export default function CountryForm() {
  const { toast } = useToast();

  const [countries, setCountries] = useState<Item[]>([]);
  const [states, setStates] = useState<Item[]>([]);
  const [countryId, setCountryId] = useState<number | null>(null);
  const [stateId, setStateId] = useState<number | null>(null);

  async function fetchCountries() {
    const data = await fetchAction("/countries", HttpMethod.GET);
    setCountries(data as Item[]);
  }

  async function fetchStateByCountry(country: string) {
    const data = await fetchAction(
      `/countries/${country}/states`,
      HttpMethod.GET
    );
    setStates(data as Item[]);
  }

  function onChangeCountry(id: string) {
    setCountryId(parseInt(id));
  }

  function onChangeState(id: string) {
    setStateId(parseInt(id));
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (countryId) {
      setStates([]);
      fetchStateByCountry(countryId.toString());
    }
  }, [countryId]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-y-4">
        <SelectScrollable
          items={countries}
          placeholder="Select a country"
          onValueChange={onChangeCountry}
          disabled={countries.length === 0}
        />
        <SelectScrollable
          items={states}
          placeholder="Select a state"
          disabled={!countryId || states.length === 0}
          onValueChange={onChangeState}
        />
        <Button
          onClick={() => {
            toast({
              title:
                "Country: " +
                  countries.find((c) => c.id === countryId)?.value || "",
              description:
                "State: " + states.find((s) => s.id === stateId)?.value || "",
            });
          }}
          disabled={!countryId || !stateId}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

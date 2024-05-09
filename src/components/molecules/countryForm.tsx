"use client";

import { fetchAction } from "@/app/actions/fetchAction";
import { HttpMethod } from "@/constants/HttpMethod";
import { useEffect, useState } from "react";
import { Item, SelectScrollable } from "../ui/selectScrollable";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface CountryFormProps {
  countries: Item[];
  error?: string;
}

export default function CountryForm({ countries, error }: CountryFormProps) {
  const { toast } = useToast();

  const [states, setStates] = useState<Item[]>([]);
  const [countryId, setCountryId] = useState<number | null>(null);
  const [stateId, setStateId] = useState<number | null>(null);

  async function fetchStateByCountry(country: string) {
    const data = await fetchAction(
      `/countries/${country}/states`,
      HttpMethod.GET
    );
    setStates(data.data as Item[]);
    if (data.error) {
      toast({
        description: data.error,
      });
    }
  }

  function onChangeCountry(id: string) {
    setCountryId(parseInt(id));
    setStates([]);
    setStateId(null);
  }

  function onChangeState(id: string) {
    setStateId(parseInt(id));
  }

  useEffect(() => {
    if (countryId) {
      fetchStateByCountry(countryId.toString());
    }
  }, [countryId]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

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

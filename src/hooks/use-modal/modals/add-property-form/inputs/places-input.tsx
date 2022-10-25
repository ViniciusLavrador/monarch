import { ComponentProps, ComponentPropsWithoutRef, useState } from "react";

import { Autocomplete, useLoadScript } from "@react-google-maps/api";

import Input from "../../../../../components/input/input";
import { env } from "../../../../../env/client.mjs";

import type AddPropertyForm from "../types";
import { useAddPropertyFormFormContext } from "../add-property-form-context";

const loadScriptOptions: Parameters<typeof useLoadScript>["0"] = {
  googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_CLIENT_PLACES_API_KEY,
  libraries: ["places"],
  language: "pt-BR",
};

const PlacesInput: React.FC<ComponentPropsWithoutRef<typeof Input>> = ({ className, ...props }) => {
  const [autocomplete, setAutocomplete] = useState<AddPropertyForm.AutoCompleteObject | null>(null);
  const { isLoaded } = useLoadScript(loadScriptOptions);
  const form = useAddPropertyFormFormContext();

  return isLoaded ? (
    <Autocomplete
      className={className}
      onLoad={(autoCompleteObj) => setAutocomplete(autoCompleteObj)}
      fields={["place_id", "geometry.location"]}
      onPlaceChanged={() => {
        if (autocomplete) {
          const place = autocomplete.getPlace();
          form.setFieldValue("place", place);
        } else {
          form.setFieldValue("place", {});
        }
      }}
    >
      <Input
        {...props}
        autoComplete="off"
        onKeyDown={(ev) => {
          if (ev.key === "enter") {
            ev.preventDefault();
            return false;
          }
        }}
      />
    </Autocomplete>
  ) : (
    <Input className={className} {...props} />
  );
};

export default PlacesInput;

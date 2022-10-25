import { Autocomplete } from "@react-google-maps/api";
import { ComponentProps } from "react";

namespace AddPropertyForm {
  export type AutoCompleteObject = Parameters<
    NonNullable<ComponentProps<typeof Autocomplete>["onLoad"]>
  >["0"];

  export type PlaceResult = ReturnType<AutoCompleteObject["getPlace"]>;

  export type FormValues = {
    name: string;
    type: string;
    description: string;
    place: PlaceResult;
  };

  export type FormValuesAfterTransformation = {
    name: string;
    type: number;
    description: string;
    address: {
      placeID: string;
      street: string;
      number: string;
      zipCode: string;
      city: string;
      state: string;
      country: string;
      lat?: number;
      long?: number;
      additionalAddressLine1?: string;
      additionalAddressLine2?: string;
    };
  };

  export type FormTrasformFunction = (
    values: AddPropertyForm.FormValues,
  ) => AddPropertyForm.FormValuesAfterTransformation;
}

export default AddPropertyForm;

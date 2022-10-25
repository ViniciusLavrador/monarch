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
    place: PlaceResult;
  };

  export type FormValuesAfterTransformation = {
    name: string;
    type: number;
    place: PlaceResult;
  };

  export type FormTrasformFunction = (
    values: AddPropertyForm.FormValues,
  ) => AddPropertyForm.FormValuesAfterTransformation;
}

export default AddPropertyForm;

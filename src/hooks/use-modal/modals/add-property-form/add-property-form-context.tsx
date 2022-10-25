import { createFormContext } from "@mantine/form";
import AddPropertyForm from "./types";

const [AddPropertyFormProvider, useAddPropertyFormFormContext] = createFormContext<
  AddPropertyForm.FormValues,
  AddPropertyForm.FormTrasformFunction
>();

export { AddPropertyFormProvider, useAddPropertyFormFormContext };

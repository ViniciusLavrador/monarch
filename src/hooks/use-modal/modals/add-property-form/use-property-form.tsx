import { useForm } from "@mantine/form";
import AddPropertyForm from "./types";

const useAddPropertyForm = () => {
  return useForm<AddPropertyForm.FormValues, AddPropertyForm.FormTrasformFunction>({
    initialValues: {
      name: "",
      type: "",
      place: {},
    },
    transformValues: (values) => ({
      ...values,
      type: parseInt(values.type, 10),
    }),
  });
};

export default useAddPropertyForm;

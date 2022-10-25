import { useForm } from "@mantine/form";
import AddPropertyForm from "./types";

const useAddPropertyForm = () => {
  return useForm<AddPropertyForm.FormValues, AddPropertyForm.FormTrasformFunction>({
    initialValues: {
      name: "",
      type: "",
      description: "",
      place: {},
    },
    transformValues: (values) => {
      const addressComponents: Record<string, string> = {};

      if (values.place.address_components) {
        values.place.address_components.map(({ long_name, types }) =>
          types.map((t) => (addressComponents[t] = long_name)),
        );
      }

      return {
        name: values.name,
        type: parseInt(values.type, 10),
        description: values.description,
        address: {
          placeID: values.place.place_id || "",
          street: addressComponents.route || "",
          number: addressComponents.street_number || "",
          city: addressComponents.administrative_area_level_2 || "",
          state: addressComponents.administrative_area_level_1 || "",
          country: addressComponents.country || "",
          zipCode: addressComponents.postal_code || "",
          lat: values.place.geometry?.location?.lat(),
          long: values.place.geometry?.location?.lng(),
        },
      };
    },
  });
};

export default useAddPropertyForm;

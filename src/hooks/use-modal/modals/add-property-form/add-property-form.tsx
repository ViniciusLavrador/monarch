import { trpc } from "../../../../utils/trpc";
import Input from "../../../../components/input/input";
import Select from "../../../../components/select/select";
import Button from "../../../../components/button/button";

import useAddPropertyForm from "./use-property-form";
import PlacesInput from "./inputs/places-input";
import { AddPropertyFormProvider } from "./add-property-form-context";

const AddPropertyFormModal: Modal.DynamicModalContentType = ({}) => {
  const form = useAddPropertyForm();
  const { data, isLoading } = trpc.useQuery(["preferences.properties.types.getAll"], {
    onSuccess: (data) => data[0] && form.setFieldValue("type", data[0].id.toString()),
  });

  const createPropertyMutation = trpc.useMutation("properties.create", {
    onSuccess: (data) => console.log("success", { data }),
    onError: ({ message }) => console.error("error", { message }),
  });

  return (
    <AddPropertyFormProvider form={form}>
      <form
        onSubmit={form.onSubmit((data) => console.log(data))}
        className="grid grid-cols-6 gap-4"
      >
        <Input
          variant="secondary"
          type="text"
          id="property-name"
          placeholder="Apartamento 2 Quartos - Empreendimento Villas"
          required
          label="Nome"
          className="col-span-5"
          {...form.getInputProps("name")}
        />
        <Select
          label="Tipo"
          variant="secondary"
          className="col-span-1"
          required
          options={data && data.map(({ id, name }) => ({ key: id, value: id, label: name }))}
          {...form.getInputProps("type")}
        />

        <PlacesInput
          variant="secondary"
          type="text"
          id="property-name"
          placeholder="Endereço"
          label="Endereço da Propriedade"
          className="col-span-full"
        />
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </form>
    </AddPropertyFormProvider>
  );
};

AddPropertyFormModal.Title = "Adidionar Propriedade";

export default AddPropertyFormModal;

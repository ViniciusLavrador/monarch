import { trpc } from "../../../../utils/trpc";
import Input from "../../../../components/input/input";
import Select from "../../../../components/select/select";
import Button from "../../../../components/button/button";

import useAddPropertyForm from "./use-property-form";
import PlacesInput from "./inputs/places-input";
import { AddPropertyFormProvider } from "./add-property-form-context";
import RTEInput from "../../../../components/rte-input/rte-input";
import useLoading from "../../../use-loading/use-loading";
import useModal from "../../use-modal";
import { notifyError, notifySuccess } from "../../../../utils/notifications";
import { useState } from "react";

const AddPropertyFormModal: Modal.DynamicModalContentType = ({}) => {
  const [disabledSubmission, setDisabledSubmission] = useState(false);
  const { popModalKey } = useModal();
  const form = useAddPropertyForm();
  const { addLoadingForKey, removeLoadingForKey } = useLoading("createPropertyMutation");
  const { data } = trpc.useQuery(["preferences.properties.types.getAll"], {
    onSuccess: (data) => data[0] && form.setFieldValue("type", data[0].id.toString()),
  });

  const createPropertyMutation = trpc.useMutation("properties.create", {
    onMutate: () => {
      addLoadingForKey();
      setDisabledSubmission(true);
    },
    onSuccess: () =>
      notifySuccess({
        message: "Propriedade adicionada com sucesso",
        onClose: popModalKey,
      }),
    onError: (err) => {
      setDisabledSubmission(false);
      console.log({ err });
      notifyError({ message: err.message });
    },
    onSettled: removeLoadingForKey,
  });

  return (
    <AddPropertyFormProvider form={form}>
      <form
        onSubmit={form.onSubmit((data) => createPropertyMutation.mutate(data))}
        className="grid grid-cols-6 gap-4"
      >
        <Input
          preventDefaultOnEnter
          variant="secondary"
          type="text"
          id="property-name"
          placeholder="Apartamento 2 Quartos - Empreendimento Villas"
          required
          label="Nome"
          className="col-span-full md:col-span-4"
          {...form.getInputProps("name")}
        />
        <Select
          preventDefaultOnEnter
          label="Tipo"
          variant="secondary"
          className="col-span-full md:col-span-2"
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
          required
        />
        <RTEInput
          required
          label="Descrição da Propriedade"
          className="col-span-full"
          variant="secondary"
          controls={[
            ["bold", "italic", "underline", "strike", "clean"],
            ["h1", "h2", "h3", "h4", "h5", "h6"],
            ["unorderedList", "orderedList"],
            ["link", "blockquote"],
            ["alignLeft", "alignCenter", "alignRight"],
            ["sup", "sub"],
          ]}
          {...form.getInputProps("description")}
        />

        <Button variant="primary" type="submit" disabled={disabledSubmission}>
          Salvar
        </Button>
      </form>
    </AddPropertyFormProvider>
  );
};

AddPropertyFormModal.Title = "Adidionar Propriedade";

export default AddPropertyFormModal;

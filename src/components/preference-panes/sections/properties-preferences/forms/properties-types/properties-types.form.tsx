import { XMarkIcon } from "@heroicons/react/20/solid";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { z } from "zod";
import useLoading from "../../../../../../hooks/use-loading/use-loading";
import { trpc } from "../../../../../../utils/trpc";
import Button from "../../../../../button/button";
import Input from "../../../../../input/input";

const validationSchema = z.object({
  propertyType: z
    .string()
    .trim()
    .min(3)
    .transform((propertyType) => propertyType.toUpperCase()),
});

const PropertiesTypesForm: React.FC = () => {
  const { toggleLoadingForKey: toggleLoadingForCreate } = useLoading(
    "preferences.properties.types.create",
  );
  const { toggleLoadingForKey: toggleLoadingForRemove } = useLoading(
    "preferences.properties.types.remove",
  );

  const typesQuery = trpc.useQuery(["preferences.properties.types.getAll"]);
  const createTypeMutation = trpc.useMutation(["preferences.properties.types.create"], {
    onSuccess() {
      typesQuery.refetch();
      reset();
      toggleLoadingForCreate();
    },
  });

  const removeTypeMutation = trpc.useMutation(["preferences.properties.types.remove"], {
    onSuccess() {
      typesQuery.refetch();
      toggleLoadingForRemove();
    },
  });

  const { onSubmit, getInputProps, onReset, reset } = useForm({
    validate: zodResolver(validationSchema),
    initialValues: {
      propertyType: "",
    },
  });

  const handleRemove = (id: number) => {
    removeTypeMutation.mutate(id);
    toggleLoadingForRemove();
  };

  const handleSubmit = onSubmit((values) => {
    toggleLoadingForCreate();
    createTypeMutation.mutate(values.propertyType);
  });

  return (
    <form onSubmit={handleSubmit} onReset={onReset}>
      <div className="flex flex-row items-end justify-between gap-4">
        <Input
          type="text"
          id="property-type"
          placeholder="APARTAMENTO"
          required
          label="Tipo de Propriedade"
          labelProps={{ className: "font-bold" }}
          className="grow"
          {...getInputProps("propertyType")}
        />

        <Button className="h-fit" type="submit">
          Adicionar
        </Button>
      </div>
      <div className="h-4" />

      <div className="text-gray-300 text-xs flex flex-wrap gap-1">
        {typesQuery.data && typesQuery.data.length > 0
          ? typesQuery.data.map(({ name, id }) => (
              <span
                key={id}
                className="rounded p-1 cursor-pointer transition-all duration-300 group bg-valhalla-50 hover:bg-red-500 "
                onClick={() => handleRemove(id)}
              >
                {name}
                <XMarkIcon className="w-4 h-4 hidden group-hover:inline-block animate-pulse ml-2" />
              </span>
            ))
          : "Nenhum tipo de categoria foi encontrado."}
      </div>

      <div className="h-2" />
    </form>
  );
};

export default PropertiesTypesForm;

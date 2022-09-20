import { XIcon } from "@heroicons/react/solid";
import { useForm, zodResolver } from "@mantine/form";
import { FormEventHandler } from "react";
import { z } from "zod";
import useLoading from "../../../../../../hooks/use-loading/use-loading";
import { trpc } from "../../../../../../utils/trpc";
import Button from "../../../../../button/button";
import Input from "../../../../../input/input";
import Tag from "../../../../../Tag/Tag";

const validationSchema = z.object({
  propertyType: z
    .string()
    .trim()
    .min(3)
    .transform((propertyType) => propertyType.toUpperCase()),
});

export interface PropertiesTypesFormProps {}

const PropertiesTypesForm: React.FC<PropertiesTypesFormProps> = ({}) => {
  const typesQuery = trpc.useQuery(["preferences.properties.types.getAll"]);
  const createTypeMutation = trpc.useMutation(["preferences.properties.types.create"], {
    onSuccess() {
      typesQuery.refetch();
      reset();
    },
  });

  const { onSubmit, getInputProps, onReset, reset } = useForm({
    validate: zodResolver(validationSchema),
    initialValues: {
      propertyType: "",
    },
  });

  const handleSubmit = onSubmit((values) => {
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
          Submit
        </Button>
      </div>
      <div className="h-4" />

      <div className="text-gray-300 text-xs flex flex-wrap gap-1">
        {typesQuery.data
          ? typesQuery.data.map(({ name, id }, index, arr) => (
              <span
                key={id}
                className="rounded p-1 cursor-pointer transition-all duration-300 group bg-valhalla-50 hover:bg-red-500"
              >
                {name}
                <XIcon className="w-4 h-4 hidden group-hover:inline-block animate-pulse ml-2" />
              </span>
            ))
          : "Nenhum tipo de categoria foi cadastrado."}
      </div>

      <div className="h-2" />

      {/* <div className="p-2 mb-3 flex flex-wrap rounded-lg border bg-valhalla-50 border-valhalla-600">
        {typesQuery.data ? (
          typesQuery.data.map(({ id, name }) => (
            <Tag key={id} onClose={() => {}}>
              {name}
            </Tag>
          ))
        ) : (
          <h1 className="text-sm text-gray-300 font-thin m-4">
            Nenhum tipo de categoria foi cadastrado.
          </h1>
        )}
      </div> */}
    </form>
  );
};

export default PropertiesTypesForm;

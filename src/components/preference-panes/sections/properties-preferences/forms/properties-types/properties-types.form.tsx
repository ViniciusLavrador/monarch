import Button from "../../../../../button/button";
import Input from "../../../../../input/input";
import Tag from "../../../../../Tag/Tag";

export interface PropertiesTypesFormProps {}

const PropertiesTypesForm: React.FC<PropertiesTypesFormProps> = ({}) => {
  return (
    <form>
      <div className="flex flex-row items-end justify-between gap-4">
        <Input
          type="text"
          id="property-type"
          placeholder="APARTAMENTO"
          required
          label="Tipo de Propriedade"
          labelProps={{ className: "font-bold" }}
          className="grow"
        />

        <Button className="h-fit" type="submit">
          Submit
        </Button>
      </div>
      <div className="h-4" />
      <div className="px-2 pt-2 pb-11 mb-3 flex flex-wrap rounded-lg border bg-valhalla-50 border-valhalla-600">
        <Tag onClose={() => {}}>APARTAMENTO</Tag>
      </div>
    </form>
  );
};

export default PropertiesTypesForm;

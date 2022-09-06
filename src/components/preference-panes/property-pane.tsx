import { useState } from "react";
import Button from "../button/button";
import Checkbox from "../checkbox/checkbox";
import Input from "../input/input";
import Select from "../select/select";

const PropertyPane: React.FC = ({}) => {
  return (
    <section>
      <h1 className="text-gray-300 font-bold">Preferências de Propriedades</h1>
      <div className="h-4" />
      <p className="text-gray-400 text-sm">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, harum cupiditate
        adipisci explicabo tenetur atque dignissimos pariatur quisquam. Earum cupiditate rem harum
        nobis rerum voluptatem corporis aliquam suscipit quas deleniti!
      </p>

      <div className="my-4 h-0 border-b border-gray-400 opacity-40" />

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
      </form>
    </section>
  );
};

export default PropertyPane;

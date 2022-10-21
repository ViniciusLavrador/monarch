import BaseCard from "../../components/cards/base-card";
import FastAccess from "../../components/cards/properties/fast-access";
import SignedPropertiesAmount from "../../components/cards/properties/signed-property";
import { trpc } from "../../utils/trpc";

const PropertiesPage: NextPageWithLayout = () => {
  const { data } = trpc.useQuery(["properties.getAll"]);

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 grid-rows-3 h-full">
      <SignedPropertiesAmount amount={data?.length || null} />

      <BaseCard className="md:col-span-2 row-span-3"></BaseCard>
      <FastAccess />
    </div>
  );
};

export default PropertiesPage;

PropertiesPage.layout = "main";

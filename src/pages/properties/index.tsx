import { ArrowRightIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import BaseCard from "../../components/cards/base-card";
import FastAccess from "../../components/cards/properties/fast-access";
import SignedPropertiesAmount from "../../components/cards/properties/signed-property";
import useLoading from "../../hooks/use-loading/use-loading";
import { trpc } from "../../utils/trpc";

const PropertiesPage: NextPageWithLayout = () => {
  const { data } = trpc.useQuery(["properties.getAll"], {});

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 grid-rows-3 h-full">
      <SignedPropertiesAmount amount={data?.length || null} />

      <BaseCard className="md:col-span-2 row-span-3 pb-0" title="PROPRIEDADES">
        <div className="flex flex-col gap-4 max-h-[90%] overflow-auto">
          {data &&
            data.map((d) => (
              <div
                className={classNames(
                  "flex flex-row justify-between w-full p-4 rounded-md items-center",
                  "bg-valhalla-50 hover:bg-valhalla-100 transition-all duration-200 cursor-pointer",
                )}
              >
                <div key={d.id} className="text-white">
                  <h3 className="font-bold">{d.name}</h3>
                  <p className="font-light text-sm">{d.formattedAddress}</p>
                </div>

                <ArrowRightIcon className="h-6 w-6 text-white" />
              </div>
            ))}
        </div>
      </BaseCard>
      <FastAccess />
    </div>
  );
};

export default PropertiesPage;

PropertiesPage.layout = "main";

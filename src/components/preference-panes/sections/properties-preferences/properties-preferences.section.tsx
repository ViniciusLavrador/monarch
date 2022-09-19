import PropertiesTypesForm from "./forms/properties-types/properties-types.form";

export interface PropertiesPreferencesSectionProps {}

const PropertiesPreferencesSection: React.FC<PropertiesPreferencesSectionProps> = ({}) => {
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

      <PropertiesTypesForm />
    </section>
  );
};

export default PropertiesPreferencesSection;

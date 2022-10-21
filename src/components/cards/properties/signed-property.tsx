import BaseCard from "../base-card";

type SignedPropertiesAmount = {
  amount: number | null;
};

const SignedPropertiesAmount: React.FC<SignedPropertiesAmount> = ({ amount }) => {
  return (
    <BaseCard title="PROPRIEDADES CADASTRADAS">
      <div className="h-full flex justify-center items-center">
        <span className="my-auto block text-6xl font-thin font-title text-gray-50">
          {amount || 0}
        </span>
      </div>
    </BaseCard>
  );
};

export default SignedPropertiesAmount;

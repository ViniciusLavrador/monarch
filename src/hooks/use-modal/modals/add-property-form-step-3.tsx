import useModal from "../use-modal";

const AddPropertyFormModalStep3: Modal.DynamicModalContentType = ({}) => {
  const { pushModal } = useModal();
  return (
    <>
      <div className="mt-2">
        <p className="text-sm text-gray-500">ADD PROPERTY FORM STEP 3</p>
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => pushModal({ key: "AddPropertyFormModal" })}
        >
          Finalizar !
        </button>
      </div>
    </>
  );
};

AddPropertyFormModalStep3.Title = "Adidionar Propriedade Passo 3";

export default AddPropertyFormModalStep3;

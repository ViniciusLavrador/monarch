import useModal from "../use-modal";

type AddPropertyFormModalProps = {};

const AddPropertyFormModal: Modal.DynamicModalContentType<AddPropertyFormModalProps> = ({}) => {
  const { pushModal } = useModal();
  return (
    <>
      <div className="mt-2">
        <p className="text-sm text-gray-500">ADD PROPERTY FORM STEP 1</p>
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => pushModal({ key: "AddPropertyFormModalStep2" })}
        >
          Próximo Passo
        </button>
      </div>
    </>
  );
};

AddPropertyFormModal.Title = "Adidionar Propriedade Passo 1";

export default AddPropertyFormModal;

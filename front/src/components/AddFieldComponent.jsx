import { IoClose } from "react-icons/io5";

export const AddFieldComponent = ({ close, value, onChange, submit }) => {
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 flex items-center justify-center">
      <div className="bg-white rounded p-4 w-full max-w-md">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Adicionar campos</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>

        <input
          type="text"
          className="bg-blue-50 my-3 p-2 vorder outline-none focus-within:border-primary-100 rouned w-full"
          placeholder="Digite o nome do campo"
          value={value}
          onChange={onChange}
        />

        <button
          onClick={submit}
          className="bg-primary-200 hover:bg-primary-100 px-4 py-2 rounded mx-auto w-fit block"
        >
          Adicionar campos
        </button>
      </div>
    </section>
  );
};

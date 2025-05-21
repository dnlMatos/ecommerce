import UserMenu from "../components/UserMenu";
import { IoClose } from "react-icons/io5";

const UserMenuMobile = () => {
  return (
    <session className="h-full w-full py-8">
      <button
        onClick={() => window.history.close()}
        className="text-neutral-800 block w-fit ml-auto mt-3"
      >
        <IoClose size={25} />
      </button>
      <div className="container mx-auto py-3">
        <UserMenu />
      </div>
    </session>
  );
};

export default UserMenuMobile;

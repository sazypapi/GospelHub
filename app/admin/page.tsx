import AdminTab from "@/components/admin/AdminTab";
import Containers from "@/components/global/Container";
import { logoutAdmin } from "@/utils/actions";

export default function AdminPage() {
  return (
    <div>
      <Containers className="py-4">
        <div className="flex items-center justify-between align-middle mb-5 sm:mb-10">
          <h1 className="font-azonix text-base sm:text-xl text-left">
            Welcome, Admin
          </h1>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="text-neutral-950 bg-transparent px-2 py-1 hover:bg-black text-xs hover:text-white border-2 border-black transition duration-500 rounded-md font-semibold">
              Logout
            </button>
          </form>
        </div>
        <AdminTab />
      </Containers>
    </div>
  );
}

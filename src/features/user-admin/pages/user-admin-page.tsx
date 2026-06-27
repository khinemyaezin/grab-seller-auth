import { Header } from "@khinemyaezin/seller-ui";
import UserAdminView from "../components/user-admin-view";
import useIdentityRoot from "@/features/shared/hook/use-identity-root";

export default function UserAdminPage() {
  const { data: identityRoot, isLoading, isError } = useIdentityRoot();

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (isError || !identityRoot?.listUsers) {
    return (
      <div className="p-8 text-center text-red-500">
        Error: Unable to load user administration. You might not have permission.
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-background p-8">
      <div className="container mx-auto max-w-2xl">
        <Header
          title={`User Management`}
          description="A list of all users in the system including their roles and status."
        >
        </Header>
        <UserAdminView link={identityRoot.listUsers} />
      </div>
    </main>
  );
}

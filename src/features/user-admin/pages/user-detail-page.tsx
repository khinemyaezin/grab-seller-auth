import { useParams, Link } from "react-router";
import UserDetailView from "../components/user-detail-view";
import useIdentityRoot from "@/features/shared/hook/use-identity-root";
import { Header } from "@khinemyaezin/seller-ui";
import { Button } from "@khinemyaezin/seller-ui/components/button";
import { routes } from "@khinemyaezin/seller-contracts";

export default function UserDetailPage() {
  const { userId } = useParams<{ userId: string }>();
  const { data: identityRoot, isLoading, isError } = useIdentityRoot();

  if (!userId) {
    return <div className="p-8 text-center text-red-500">Error: User ID is required.</div>;
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <Header
        title="User Details"
        description="View and manage this user's information and permissions."
      >
        <Button variant="outline">
          <Link to={routes.admin.users}>Back</Link>
        </Button>
      </Header>
      {identityRoot?.getUser && (
        <UserDetailView link={identityRoot.getUser} userId={userId} />
      )}
    </div>
  );
}

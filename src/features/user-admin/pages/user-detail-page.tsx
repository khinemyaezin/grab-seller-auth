import { useParams, Link } from "react-router";
import UserDetailView from "../components/user-detail-view";
import { Header } from "@khinemyaezin/seller-ui";
import { Button } from "@khinemyaezin/seller-ui/components/button";
import { routes } from "@khinemyaezin/seller-contracts";
import { useIdentityGet } from "@/features/shared/hook/use-identity";

export default function UserDetailPage() {
  const { userId } = useParams<{ userId: string }>();
  const { data: identityRoot, isLoading, isError } = useIdentityGet();

  if (!userId) {
    return <div className="p-8 text-center text-red-500">Error: User ID is required.</div>;
  }

  return (
    <main className="flex min-h-screen flex-col bg-background p-8">
      <div className="container mx-auto max-w-2xl">
        <Header
          title="User Details"
          description="View and manage this user's information and permissions."
        >
          <Button variant="outline">
            <Link to="">Back</Link>
          </Button>
        </Header>
        {(identityRoot as any)?.getUser && (
          <UserDetailView link={undefined!} userId={userId} />
        )}
      </div>
    </main>
  );
}

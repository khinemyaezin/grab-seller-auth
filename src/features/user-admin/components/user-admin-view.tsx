import { HateoasLink } from "@khinemyaezin/seller-api";
import { useState } from "react";
import { useUsersQuery } from "../hooks/use-users";
import UserAdminTable from "./user-admin-table";
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@khinemyaezin/seller-ui/components/card";

export type UserAdminViewProps = {
  link: HateoasLink;
};

export default function UserAdminView({ link }: UserAdminViewProps) {
  const [page, setPage] = useState(0);

  const { data, isLoading, isError } = useUsersQuery(link, page);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Card >
      <CardHeader>
        <CardTitle>User list</CardTitle>
        <CardAction>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-3">
        <UserAdminTable
          data={data}
          isLoading={isLoading}
          isError={isError}
          onPageChange={handlePageChange}
        />
      </CardContent>
    </Card>
  );
}

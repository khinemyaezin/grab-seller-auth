import { Badge } from "@khinemyaezin/seller-ui/components/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter
} from "@khinemyaezin/seller-ui/components/table";
import { Pager } from "@khinemyaezin/seller-ui/components/pager";
import { Link } from "react-router";
import { UserProfilePageResponse } from "../types/user-admin.model";
import { routes } from "@khinemyaezin/seller-contracts";

export type UserAdminTableProps = {
  data?: UserProfilePageResponse;
  isLoading: boolean;
  isError: boolean;
  onPageChange: (newPage: number) => void;
};

export default function UserAdminTable({ data, isLoading, isError, onPageChange }: UserAdminTableProps) {
  if (isLoading) return <div className="p-4 text-center">Loading users...</div>;
  if (isError) return <div className="p-4 text-center text-red-500">Error loading users.</div>;

  const users = data?._embedded?.userProfileResponseList || [];
  const pageMeta = data?.page;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          return (
            <TableRow key={user.id}>
              <TableCell><Link to="">{user.email}</Link></TableCell>
              <TableCell>
                <Badge variant={
                  user.status === 'ACTIVE' ? 'default' :
                    user.status === 'SUSPENDED' ? 'destructive' : 'secondary'
                }>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</TableCell>
           
            </TableRow>
          );
        })}
        {users.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
              No users found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={1} className="text-muted-foreground">
            Showing {users.length} of {pageMeta?.totalElements} users
          </TableCell>
          <TableCell colSpan={4}>
            {data?.page && (
              <Pager
                className="justify-end"
                onPageChange={onPageChange}
                {...data?.page}
              />
            )}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

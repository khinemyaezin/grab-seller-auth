import { Badge } from "@khinemyaezin/seller-ui/components/badge";
import { X } from "lucide-react";

export type UserRoleTableProps = {
    roles: string[];
    onRevokeRole?: (code: string) => void;
}

export default function UserRoleTable({ roles, onRevokeRole }: UserRoleTableProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
                <Badge key={role} variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-0.5 text-xs font-normal">
                    {role}
                    {onRevokeRole && (
                        <button
                            type="button"
                            className="rounded-full hover:bg-muted-foreground/20 p-0.5 text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => onRevokeRole(role)}
                        >
                            <X className="h-3.5 w-3.5" />
                            <span className="sr-only">Revoke</span>
                        </button>
                    )}
                </Badge>
            ))}
            {(!roles || roles.length === 0) && (
                <div className="py-2 text-sm text-gray-500">No roles assigned.</div>
            )}
        </div>
    )
}
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchIdentityRoot } from "../../auth/api/discovery";
import { useEntryLink } from "../context";
import type { IdentityRoot } from "@/features/auth/types/auth.model";

export default function useIdentityRoot(): UseQueryResult<IdentityRoot, Error> {
    const entryLink = useEntryLink();

    return useQuery({
        queryKey: ["identity-root", entryLink.href],
        queryFn: () => fetchIdentityRoot(entryLink),
        enabled: !!entryLink,
    });
}
import { Input } from "@khinemyaezin/seller-ui/components/index";
import { DisplayItem, MagicSearch, MagicSearchInputProps } from "@khinemyaezin/seller-ui/components/magic-search";
import { SearchIcon } from "lucide-react";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { useRoleSearch } from "../hooks/use-users";
import { HateoasLink } from "@khinemyaezin/seller-api";
import { RoleSearchResponse } from "../types/user-admin.response";

export type RolesSearchProps = {
    link: HateoasLink,
    value: string;
    onValueChange: (value: string) => void,
    filterRoles?: string[]
}

export default function RolesSearch({ value, onValueChange: onValueChange, link, filterRoles, ...inputProps }: ComponentPropsWithoutRef<typeof Input> & RolesSearchProps) {
    const [query, setQuery] = useState<string>(value || "");
    const { data, isLoading } = useRoleSearch(link, query);

    useEffect(() =>
        setQuery(value),
        [value]);

    const getFilteredItems = (response: RoleSearchResponse) => {
        const existingRoleCodes = new Set(filterRoles);
        return (response._embedded?.searchRolesResponseList || [])
            .filter((t) => !existingRoleCodes.has(t.code) || t.code === query)
            .map(t => ({ id: t.code, name: t.name }));
    };


    return (
        <MagicSearch
            items={data ? getFilteredItems(data) : []}
            onQueryChange={setQuery}
            onQueryClear={() => {
                onValueChange("")
            }}
            onSelect={(item) => {
                onValueChange(item.id)
            }}
            isLoading={isLoading}
            renderInput={(props: MagicSearchInputProps): React.ReactElement =>
                <div className="relative">
                    <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        {...inputProps}
                        {...props}
                    />
                </div>
            }
        />
    )
}
import { DropdownMenuGroup, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, Skeleton } from "@khinemyaezin/seller-ui/components/index";
import { useAccessContextList, useAccessContextSelection } from "../hooks/use-access-context";
import { useIdentityGet } from "@/features/shared/hook/use-identity";
import { usePlatform } from "@khinemyaezin/seller-ui";
import { AccessContext, AccessContextListResponse } from "../types";
import { eventBus, resolveLink } from "@khinemyaezin/seller-api";
import { useEffect, useId, useState } from "react";

const accessContextResponseToModel = (response: AccessContextListResponse | undefined): AccessContext[] => {
    const accessResponse = response?._embedded?.accessContextResponseList ?? [];
    return accessResponse.map((access) => ({
        ...access,
        accessLink: resolveLink(access._links, "select-access-context")
    }));
}

export default function AccessContextMenu() {
    const { data: identity } = useIdentityGet();
    const platform = usePlatform();
    const id = useId();
    const { data: accessContext, isPending } = useAccessContextList(identity?.listAccessContext);
    const selectAccessContext = useAccessContextSelection();
    const contextList = accessContextResponseToModel(accessContext);

    const currentSession = platform?.session.getSnapshot();
    const currentAssignmentId = currentSession?.status === 'authenticated'
        ? currentSession.user.currentAccessContext?.assignmentId
        : undefined;

    const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>(currentAssignmentId ?? "");

    useEffect(() => {
        if (currentAssignmentId) {
            setSelectedAssignmentId(currentAssignmentId);
        }
    }, [currentAssignmentId]);

    const handleValueChange = (newAssignmentId: string) => {
        setSelectedAssignmentId(newAssignmentId);

        const selectedContext = contextList.find(c => c.assignmentId === newAssignmentId);
        if (!selectedContext?.accessLink) {
            if (currentAssignmentId) {
                setSelectedAssignmentId(currentAssignmentId);
            }
            return;
        }

        selectAccessContext.mutate(
            { link: selectedContext.accessLink },
            {
                onSuccess: () => {
                    (platform?.events ?? eventBus).publish("auth:context-selected:v1", { assignmentId: newAssignmentId });
                },
                onError: () => {
                    if (currentAssignmentId) {
                        setSelectedAssignmentId(currentAssignmentId);
                    }
                }
            }
        );
    }

    return (
        <DropdownMenuGroup>
            <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
            {isPending ? (
                <div className="flex w-full max-w-xs flex-col gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            ) : (
                <DropdownMenuRadioGroup value={selectedAssignmentId} onValueChange={handleValueChange}>
                    {contextList.map((context, index) => (
                        <DropdownMenuRadioItem key={`${id}-${index}`} value={context.assignmentId}>
                            {context.display?.title ?? ""}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            )}

        </DropdownMenuGroup>
    )
}
import RolesSearch from "./roles-search";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { UserRoleForm } from "../types";
import { HateoasLink } from "@khinemyaezin/seller-api";
import { ButtonGroup } from "@khinemyaezin/seller-ui/components/button-group";
import { Button } from "@khinemyaezin/seller-ui/components/button";

export type EditUserRolesFormProps = {
  link: HateoasLink,
  isPending: boolean;
  filterRoles?: string[]
  onAssignRole: (code: string) => void;
};

export default function EditUserRolesForm({ link, filterRoles, onAssignRole }: EditUserRolesFormProps) {
  const form = useForm<UserRoleForm>();
  const { handleSubmit, control, reset } = form;

  const handleOnSubmit = (value: UserRoleForm) => {
    onAssignRole(value.roleCode);
    reset();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <ButtonGroup>
          <Controller
            control={control}
            name="roleCode"
            rules={{
              required: "Role is required",
            }}
            render={({ field }) => (
              <RolesSearch
                {...field}
                id="roleCode"
                type="text"
                placeholder="Search roles to add"
                className="pl-9"
                link={link}
                filterRoles={filterRoles}
                onValueChange={field.onChange}
              />
            )}
          />
          <Button type="submit">Add</Button>
        </ButtonGroup>
      </form>
    </FormProvider>
  );
}

import { Input } from "@khinemyaezin/seller-ui/components/input";

export type UserAdminFilterProps = {
  searchTerm: string;
  onFilterChange: (term: string) => void;
};

export default function UserAdminFilter({ searchTerm, onFilterChange }: UserAdminFilterProps) {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input 
        type="search" 
        placeholder="Search users..." 
        value={searchTerm}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
}

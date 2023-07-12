import _ from "lodash";
import { User } from "@prisma/client";
import SelectionItem from "./SelectionItem";

interface Props {
  users: User[];
  selectedUsers: User[];
  onSelect: (user: User) => void;
}
const Users = ({ users, onSelect, selectedUsers }: Props) => {
  return (
    <div className="overflow-auto">
      {users.map((user) => (
        <SelectionItem
          variant="add"
          key={user.id}
          user={user}
          isActive={_.some(selectedUsers, { id: user.id })}
          onClick={() => onSelect(user)}
        />
      ))}
    </div>
  );
};

export default Users;

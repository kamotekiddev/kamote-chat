import { User } from "@prisma/client";
import SelectionItem from "./SelectionItem";

interface Props {
  users: User[];
  onRemove: (user: User) => void;
}
const SelectedUsers = ({ users, onRemove }: Props) => {
  return (
    <div className="overflow-auto">
      {users.map((user) => (
        <SelectionItem
          variant="remove"
          key={user.id}
          user={user}
          onClick={() => onRemove(user)}
        />
      ))}
    </div>
  );
};

export default SelectedUsers;

import _ from "lodash";
import { User } from "@prisma/client";
import Users from "./Users";
import SelectedUsers from "./SelectedUsers";

interface Props {
  users: User[];
  selectedUsers: User[];
  onSelect: (user: User) => void;
  onRemove: (user: User) => void;
}
const UserSelection = ({ users, selectedUsers, onSelect, onRemove }: Props) => {
  return (
    <div className="space-y-5">
      {!_.isEmpty(users) && (
        <div className="grid grid-rows-[auto_1fr] gap-4">
          <h1>Users</h1>
          <Users
            users={users}
            onSelect={onSelect}
            selectedUsers={selectedUsers}
          />
        </div>
      )}
      {!_.isEmpty(selectedUsers) && (
        <div className="grid grid-rows-[auto_1fr] gap-4">
          <h1>Selected Users</h1>
          <SelectedUsers users={selectedUsers} onRemove={onRemove} />
        </div>
      )}
    </div>
  );
};

export default UserSelection;

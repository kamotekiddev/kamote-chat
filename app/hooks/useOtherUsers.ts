import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUsers = (users: User[]) => {
  const session = useSession();

  const otherUsers = useMemo(() => {
    const currenUserEmail = session.data?.user?.email;
    return users.filter((user) => user.email !== currenUserEmail);
  }, [session.data?.user?.email, users]);

  return otherUsers;
};

export default useOtherUsers;

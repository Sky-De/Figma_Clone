import { useOthers, useSelf } from '@liveblocks/react';
import { FC } from 'react';
import { Avatar } from './Avatar';
import styles from './ActiveUsers.module.css';
import { generateRandomName } from '@/lib/utils';

const ActiveUsers: FC = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  return (
    <main className="flex h-screen w-full select-none place-content-center place-items-center">
      <div className="flex pl-3">
        {currentUser && (
          <Avatar name="You" otherStyles="border-[3px] border-primary-green" />
        )}

        {users.slice(0, 3).map(({ connectionId, info }) => {
          return (
            <Avatar
              key={connectionId}
              name={generateRandomName()}
              otherStyles="-m;-3"
            />
          );
        })}

        {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}
      </div>
    </main>
  );
};

export default ActiveUsers;

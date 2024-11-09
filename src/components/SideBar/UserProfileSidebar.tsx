import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Label } from '../ui/label';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const UserProfileSidebar = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  if (isAuthenticated && user) {
    return (
      <>
        <div className="flex items-center mb-2 md:p-2 space-x-3">
          <Avatar>
            <AvatarImage
              src={`/logo/${user.image}`}
              alt="user-logo"
              width={50}
              height={50}
            />
            <AvatarFallback>User Avatar</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ">
            <Label className="font-semibold text-accent-foreground text-sm md:text-base">
              {user.firstName}
            </Label>
            <Label className="font-normal text-xs md:text-sm text-accent-foreground">
              {user.username}
            </Label>
          </div>
        </div>
      </>
    );
  }
};

export default UserProfileSidebar;

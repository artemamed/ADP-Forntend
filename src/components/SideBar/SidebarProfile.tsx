import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import LogoutModal from '../Modals/auth/logout.modal';
import React from 'react';
import { Link } from 'react-router-dom';
import { UserAvatars } from '@/constants/Avatars';

const SidebarProfile = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  if (isAuthenticated && user) {
    return (
      <>
        <Menubar className="border-none bg-transparent p-0">
          <MenubarMenu>
            <MenubarTrigger className="p-0 ">
              <Avatar>
                <AvatarImage
                  src={UserAvatars[0]} 
                  alt="user-logo"
                  className=""
                  width={50}
                  height={50}
                />
                <AvatarFallback>{user.firstName}</AvatarFallback>
              </Avatar>
            </MenubarTrigger>
            <MenubarContent align="end">
              <MenubarItem >
                <Link to={'/profile'} className='w-full'>Profile</Link>
              </MenubarItem>
              <MenubarItem >
                <Link to={'/catalog/products'} className='w-full'>Products</Link>
              </MenubarItem>
              <MenubarItem >
                <Link to={'/settings'} className='w-full'>Settings</Link>
              </MenubarItem>
              <MenubarSeparator />
              <React.Suspense>
                <LogoutModal>
                  <span
                    className={
                      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground'
                    }
                  >
                    Logout
                  </span>
                </LogoutModal>
              </React.Suspense>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </>
    );
  }
};

export default SidebarProfile;

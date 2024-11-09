import React, { useState } from 'react';
import { useClickOutside } from '@mantine/hooks';
import { Label } from '@/components/ui/label';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { DropdownItem, LinkItem, SideBarLinks } from '@/types/SideBarLinks';
import ThemeSelect from '../Select/Theme-Select';
import SidebarProfile from './SidebarProfile';
import { Button } from '../ui/button';
import { useAppSelector } from '@/store';

type SidebarItemProps = {
  link: string;
  title: string;
  icon: React.ComponentType<any>;
  isActive: boolean;
  toggleBar: () => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  link,
  title,
  icon: Icon,
  toggleBar,
  isActive,
}) => {
  const baseClasses = 'flex items-center p-2 rounded-md group';
  const activeClasses = isActive
    ? 'border-primary/20 bg-primary text-secondary dark:text-gray-50'
    : 'border-primary/0 text-gray-700 group-hover:text-gray-400 dark:text-gray-400';

  return (
    <li
      className={`border ${
        isActive ? 'bg-primary' : ' hover:border-primary'
      } rounded-md group group-hover:text-gray-400`}
    >
      <Link
        to={link}
        className={`${baseClasses} ${activeClasses}`}
        onClick={toggleBar}
      >
        <Icon className="w-5 h-5 transition duration-75" />
        <Label className="ms-3">{title}</Label>
      </Link>
    </li>
  );
};

type DropdownMenuProps = {
  title: string;
  icon: React.ComponentType<any>;
  isOpen: boolean;
  KeySlug: string;
  toggleDropdown: () => void;
  subLink: LinkItem[];
  toggleBar: () => void;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  title,
  icon: Icon,
  isOpen,
  KeySlug,
  toggleDropdown,
  toggleBar,
  subLink,
}) => {
  const baseClasses = 'flex items-center justify-between p-2 rounded-md group';
  const iconClasses =
    'w-5 h-5 transition duration-75 text-gray-700 group-hover:text-gray-400 dark:text-gray-400';

  return (
    <li>
      <button
        type="button"
        onClick={toggleDropdown}
        className={`${baseClasses} w-full border hover:border-primary`}
      >
        <div className="flex items-center">
          <Icon className={iconClasses} />
          <Label className="ms-3 text-gray-700 group-hover:text-gray-400 dark:text-gray-400">
            {title}
          </Label>
        </div>
        <svg
          className={`w-6 h-6 transition duration-75 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </button>
      <ul className={`${isOpen ? '' : 'hidden'} py-3 pl-3  space-y-2`}>
        {subLink.map((sub, index) => {
          const subActive = KeySlug === sub.slug;
          const subClasses = subActive
            ? 'border border-primary bg-primary text-secondary dark:text-gray-50 '
            : 'border text-gray-700 group-hover:text-gray-400 dark:text-gray-400 group-hover:border-primary';
          const GroupClass = subActive
            ? 'border-l-2 border-primary'
            : 'border-l-2 hover:border-primary';
          return (
            <li key={index} className={`pl-4 group ${GroupClass} `}>
              <Link
                to={sub.link}
                onClick={toggleBar}
                className={`flex items-center p-3 rounded-lg group ${subClasses}`}
              >
                <sub.icon className="w-4 h-4 transition duration-75" />
                <Label className="ms-3">{sub.title}</Label>
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

const SideBar = () => {
  const user = useAppSelector((state) => state.auth.user);
  const filteredLinks = React.useMemo(() => {
    return user
      ? SideBarLinks.map((link) => {
          if (link.type === 'link') {
            return link.role === 'all' || link.role.includes(user.role)
              ? link
              : null;
          }
          if (link.type === 'dropdown') {
            const filteredSubLinks = link.subLink.filter(
              (subLink) =>
                subLink.role === 'all' || subLink.role.includes(user.role),
            );

            return {
              ...link, // Spread to create a new object
              subLink: filteredSubLinks, // Assign the new filtered array
            };
          }
          return link;
        }).filter(
          (link) =>
            link !== null &&
            (link.type !== 'dropdown' || link.subLink.length > 0),
        )
      : [];
  }, [user]); // Dependency array includes user
  console.log(filteredLinks);
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || '/';
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean[]>(
    SideBarLinks.map(() => false),
  );
  const [isBarOpen, setIsBarOpen] = useState<boolean>(false);
  const ref = useClickOutside(() => setIsBarOpen(false));

  React.useEffect(() => {
    // Reset dropdown state based on the number of dropdowns in filteredLinks
    setIsDropdownOpen(filteredLinks.map(link => link?.type === 'dropdown' && false));
  }, [filteredLinks]); // Reinitialize dropdown state when filteredLinks changes


  const toggleBar = () => {
    setIsBarOpen((prev) => !prev);
  };

  const toggleDropdown = (index: number) => {
    setIsDropdownOpen((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen)),
    );
  };

  return (
    <div>
      <aside
        ref={ref}
        className={`fixed top-0 z-50 left-0 w-60 h-screen bg-gray-100 dark:bg-background transition-transform ${
          isBarOpen ? '' : '-translate-x-full'
        } lg:translate-x-0 border-r border-gray-100 dark:border-foreground/5`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-1 overflow-y-auto flex flex-col justify-between scrollbar scrollbar-thumb-light-secondary scrollbar-track-light-secondSecondary scrollbar-medium">
          <ul className="space-y-2 font-medium">
            <div className="flex justify-between items-start h-10">
              <Link to="/" className="mr-6 mt-2">
                <Label
                  htmlFor="logo"
                  className="text-xl text-primary font-bold"
                >
                  AMG
                </Label>
              </Link>
            </div>
            {filteredLinks.map((BarLink, index) =>
              BarLink?.type === 'link' ? (
                <SidebarItem
                  key={index}
                  link={BarLink.link}
                  title={BarLink.title}
                  toggleBar={toggleBar}
                  icon={BarLink.icon}
                  isActive={currentPath === BarLink.slug}
                />
              ) : BarLink?.type === 'dropdown' ? (
                <DropdownMenu
                  key={index}
                  KeySlug={currentPath}
                  subLink={BarLink.subLink}
                  title={BarLink.title}
                  icon={BarLink.icon}
                  isOpen={isDropdownOpen[index]}
                  toggleDropdown={() => toggleDropdown(index)}
                  toggleBar={() => toggleBar()}
                />
              ) : BarLink?.type === 'separation' ? (
                <li key={index}>
                  <Label className="pt-3 font-medium font-abel text-sm">
                    {BarLink.title}
                  </Label>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      </aside>
      <div className="p-2 md:px-8 lg:px-4 2xl:px-3 lg:ml-60">
        <header className="rounded-lg flex h-14 lg:h-[60px] items-center gap-4 sticky z-30 top-0 w-full backdrop-blur-md">
          <Button
            variant="link"
            size="icon"
            onClick={() => setIsBarOpen((prev) => !prev)}
            className="lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 4.5A1.5 1.5 0 013.5 3h13a1.5 1.5 0 110 3h-13A1.5 1.5 0 012 4.5zm0 5A1.5 1.5 0 013.5 8h13a1.5 1.5 0 110 3h-13A1.5 1.5 0 012 9.5zm1.5 5a1.5 1.5 0 000 3h13a1.5 1.5 0 100-3h-13z" />
            </svg>
          </Button>
          <div className="flex flex-1 justify-end items-center gap-4 md:gap-5 2xl:gap-3 md:ml-auto">
            <ThemeSelect />
            <React.Suspense>
              <SidebarProfile />
            </React.Suspense>
          </div>
        </header>
        <main className="p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SideBar;

import React from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { EllipsisVertical } from 'lucide-react';

type EachCategoryProps = {
  name: string;
  index: number;
  slug: string;
  description: string;
};

const EachCategory: React.FC<EachCategoryProps> = ({ name, description }) => {
  return (
    <Card className="relative group overflow-hidden border border-gray-200 rounded-xl">
      <img
        src={`/images/category.jpg`}
        alt={name}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      {/* Name Display (Visible Before Hover) */}
      <div className="absolute bottom-4 left-1 text-2xl font-semibold text-white px-2 py-1 rounded">
        {name}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <CardHeader className="text-center gap-2">
          <CardTitle className="flex justify-end items-end text-white">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <EllipsisVertical className="h-5 w-5 text-black" />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>View Category</MenubarItem>
                  <MenubarItem>View Sub Categories</MenubarItem>
                  <MenubarItem>Edit Category</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Delete</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </CardTitle>

          <CardDescription className="text-sm text-white mt-2 px-4">
            {description}
          </CardDescription>
        </CardHeader>
      </div>
    </Card>
  );
};

export default EachCategory;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
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



const EachSubCategory: React.FC = () => {
  const navigate = useNavigate();

  const handleEditCategory = () => {
    navigate('/catalog/sub-categories/edit-sub-categories');
  };

  const handleViewProduct = () => {
    navigate('/catalog/products');
  };

  return (
    <Card className="relative group ">
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <CardHeader className="text-center gap-2">
          <CardTitle className="flex justify-end items-end text-white">
            <Menubar className='bg-secondary border-hidden shadow-none'>
              <MenubarMenu>
                <MenubarTrigger>
                  <EllipsisVertical className="h-5 w-5 text-black" />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={handleViewProduct}>View Products</MenubarItem>
                  <MenubarItem onClick={handleEditCategory}>
                    Edit Sub Category
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Delete</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </CardTitle>

        </CardHeader>
      </div>
    </Card>
  );
};

export default EachSubCategory;

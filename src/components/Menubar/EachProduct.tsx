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

const EachProduct: React.FC = () => {
  const navigate = useNavigate();

  const handleEditCategory = () => {
    navigate('/catalog/categories/edit-category');
  };

  const handleViewSubCategory = () => {
    navigate('/catalog/sub-categories');
  };

  const handleViewCategory = () => {
    navigate('/catalog/categories');
  };

  return (
    <Card className="">
      {/* Always visible Menubar */}
      <div className="absolute -top-5 -right-6 ">
        <CardHeader className="text-center gap-2 ">
          <CardTitle className="flex justify-end items-end ">
            <Menubar className='bg-secondary border-hidden shadow-none'>
              <MenubarMenu>
                <MenubarTrigger>
                  <EllipsisVertical className="h-5 w-5" />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={handleViewCategory}>View Category</MenubarItem>
                  <MenubarItem onClick={handleViewSubCategory}>View Sub Category</MenubarItem>
                  <MenubarItem onClick={handleEditCategory}>
                    Edit Product
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

export default EachProduct;

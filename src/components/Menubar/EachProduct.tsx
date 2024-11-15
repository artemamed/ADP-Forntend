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
    navigate('/catalog/products/edit-products');
  };

  return (
    <Card className="border-none">
      {/* Always visible Menubar */}
      <div className="absolute -top-2 -right-6 ">
        <CardHeader className="text-center gap-2 ">
          <CardTitle className="flex justify-end items-end ">
            <Menubar className=' border-hidden shadow-none'>
              <MenubarMenu>
                <MenubarTrigger>
                  <EllipsisVertical className="h-5 w-5" />
                </MenubarTrigger>
                <MenubarContent>
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

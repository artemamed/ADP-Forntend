import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '../ui/label';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { EllipsisVertical } from 'lucide-react';

type EachCategoryProps = {
  name: string;
  index: number;
  slug: string;
  description: string;
};

const EachCategory = (props: EachCategoryProps) => {
  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <Label className="text-xl">{props.name}</Label>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <EllipsisVertical className="h-5 w-5" />
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
          <CardDescription className="text-base line-clamp-3">
            {props.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </React.Fragment>
  );
};

export default EachCategory;

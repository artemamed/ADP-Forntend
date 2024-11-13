import EachCategory from '@/components/Menubar/EachCategory';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import React from 'react';
import { CirclePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <React.Fragment>
      <div className="flex justify-between items-center">
        <Label className="text-2xl font-semibold">Categories</Label>
        <Link to="/catalog/categories/add-new-category">
          <Button
            variant={'expandIcon'}
            Icon={CirclePlus}
            className="w-full md:w-fit"
            iconPlacement="left"
          >
            Add Category
          </Button>
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-4 gap-10">
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <EachCategory
              key={index}
              index={index}
              name="Forceps"
              description="Forceps is a medical instrument used for grasping and manipulating tissues during surgical procedures..."
              slug="forceps"
            />
            
          ))}
      </div>
    </React.Fragment>
  );
};

export default Categories;

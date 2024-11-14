import EachCategory from '@/components/Menubar/EachCategory';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import React from 'react';
import { CirclePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <Label className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">Categories</Label>
        <Link to="/catalog/categories/add-new-category">
          <Button
            variant={'expandIcon'}
            Icon={CirclePlus}
            className="w-full sm:w-auto md:w-fit"
            iconPlacement="left"
          >
            Add Category
          </Button>
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 p-4">
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

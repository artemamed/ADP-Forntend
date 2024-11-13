import EachCategory from '@/components/Menubar/EachCategory';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <React.Fragment>
      <div className="flex justify-between items-center">
        <Label className="text-2xl font-semibold">Categories</Label>
        <Link to={'add-new-category'}>
          <Button>Add Category</Button>
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-4 gap-5 ">
        {Array(10)
          .fill(null)
          .map((_, index) => {
            return (
              <EachCategory
                key={index}
                index={index}
                name="Forceps"
                description='Forceps is a medical instrument used for grasping and manipulating tissues during surgical procedures. It consists of two curved blades connected by a handle. Forceps are commonly used in various surgical specialties, including general surgery, gynecology, and ophthalmology. They are essential tools for precise and controlled manipulation of tissues during surgical procedures.'
                slug="forceps"
              />
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default Categories;

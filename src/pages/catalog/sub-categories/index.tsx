import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { CirclePlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import EachSubCategory from '@/components/Menubar/EachSubCategory';

interface Category {
  category_name: string;
}

interface SubCategory {
  sub_category: {
    sub_category_name: string;
  };
}

const SubCategories: React.FC = () => {
  const [, setAllCategories] = useState<Category[]>([]);
  const [allSubCategories, setAllSubCategories] = useState<{ category: Category; subcategories: SubCategory[] } | null>(null);

  useEffect(() => {
    // Dummy Data for Categories and Subcategories
    const dummyCategories: Category[] = [
      { category_name: 'Electronics' },
    ];

    const dummySubCategories = {
      category: { category_name: 'Sub Categories' },
      subcategories: [
        { sub_category: { sub_category_name: 'Smartphones' } },
        { sub_category: { sub_category_name: 'Laptops' } },
        { sub_category: { sub_category_name: 'Headphones' } },
        { sub_category: { sub_category_name: 'Television' } },
        { sub_category: { sub_category_name: 'Laptops' } },
        { sub_category: { sub_category_name: 'Headphones' } },
        { sub_category: { sub_category_name: 'Television' } },
        { sub_category: { sub_category_name: 'Laptops' } },
        { sub_category: { sub_category_name: 'Headphones' } },
        { sub_category: { sub_category_name: 'Television' } },
        { sub_category: { sub_category_name: 'Laptops' } },
        { sub_category: { sub_category_name: 'Headphones' } },
        { sub_category: { sub_category_name: 'Television' } },
        { sub_category: { sub_category_name: 'Laptops' } },
        { sub_category: { sub_category_name: 'Headphones' } },
        { sub_category: { sub_category_name: 'Television' } },
        { sub_category: { sub_category_name: 'Laptops' } },
        { sub_category: { sub_category_name: 'Headphones' } },
        { sub_category: { sub_category_name: 'Television' } },
      ],
    };

    // Set the dummy data to state
    setAllCategories(dummyCategories);
    setAllSubCategories(dummySubCategories);
  }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <Label className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">Sub Categories</Label>
        <Link to="/catalog/categories/add-new-category">
          <Button
            variant={'expandIcon'}
            Icon={CirclePlus}
            className="w-full sm:w-auto md:w-fit"
            iconPlacement="left"
          >
            Add Sub Category
          </Button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 h-full">
        <div className="flex flex-col md:items-start lg:w-2/3 xl:w-full pl-4 overflow-y-auto max-h-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 w-full mt-5 ">
            {allSubCategories && allSubCategories.subcategories.map((sub) => (
              <Card className="h-36 border border-gray-200 rounded-lg shadow-lg transition-transform duration-200 hover:bg-secondary transform hover:shadow-lg cursor-pointer hover:text-primary hover:scale-105 relative group">
                <div className="absolute top-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <EachSubCategory />
                </div>
                <CardHeader className="flex items-center justify-center h-full">
                  <CardTitle className="font-semibold text-center">
                    {sub.sub_category.sub_category_name}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default SubCategories;

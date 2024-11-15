import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { CirclePlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/catalog/sub-categories/add-sub-categories">
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

      <div className="flex flex-col lg:flex-row gap-6 h-full">
        <div className="flex flex-col lg:w-2/3 xl:w-full px-6 py-4 overflow-y-auto max-h-full ">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 p-2">
            {allSubCategories && allSubCategories.subcategories.map((sub, index) => (
              <div
                key={index}
                className="h-36 border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:bg-secondary hover:shadow-xl hover:scale-105 cursor-pointer relative group"
              >
                <div className="absolute top-5 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <EachSubCategory />
                </div>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    {/* Add an icon here */}
                    <img
                      src="https://cdn.iconscout.com/icon/premium/png-512-thumb/surgery-tools-icon-download-in-svg-png-gif-file-formats--plastic-surgical-instruments-medical-operation-equipment-pack-healthcare-icons-10097150.png?f=webp&w=512"
                      alt=""
                      className=" rounded-full object-contain bg-white"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-center ">
                    {sub.sub_category.sub_category_name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};
export default SubCategories;

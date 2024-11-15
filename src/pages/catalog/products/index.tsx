import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { CirclePlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EachProduct from '@/components/Menubar/EachProduct';

interface Product {
  id: number;
  slug: string;
  product_name: string;
  product_image: string;
  price: number;
  product_sizes: { product_size: string; product_sku: string }[];
}

const Products: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchDummyData = async () => {
      const dummyProducts = [
        {
          id: 1,
          slug: 'product-1',
          product_name: 'Smartphone',
          product_image: 'smartphone.jpg',
          price: 500,
          product_sizes: [
            { product_size: 'S', product_sku: 'SKU1' },
            { product_size: 'M', product_sku: 'SKU2' },
          ],
        },
        {
          id: 2,
          slug: 'product-1',
          product_name: 'Smartphone',
          product_image: 'smartphone.jpg',
          price: 500,
          product_sizes: [
            { product_size: 'S', product_sku: 'SKU1' },
            { product_size: 'M', product_sku: 'SKU2' },
          ],
        },
        {
          id: 3,
          slug: 'product-1',
          product_name: 'Smartphone',
          product_image: 'smartphone.jpg',
          price: 500,
          product_sizes: [
            { product_size: 'S', product_sku: 'SKU1' },
            { product_size: 'M', product_sku: 'SKU2' },
          ],
        },
        {
          id: 4,
          slug: 'product-1',
          product_name: 'Smartphone',
          product_image: 'smartphone.jpg',
          price: 500,
          product_sizes: [
            { product_size: 'S', product_sku: 'SKU1' },
            { product_size: 'M', product_sku: 'SKU2' },
          ],
        },

      ];
      setAllProducts(dummyProducts);
    };

    fetchDummyData();
  }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <Label className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">Products</Label>
        <Link to="/catalog/products/add-products">
          <Button
            variant="expandIcon"
            Icon={CirclePlus}
            className="w-full sm:w-auto md:w-fit"
            iconPlacement="left"
          >
            Add Product
          </Button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6  ">
        <div
          className="px-6 h-full overflow-y-auto w-full "
          id="productsSection"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6  ">
            {allProducts.map((product) => (
              <Card
                key={product.id}
                className="relative shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <EachProduct />

                <CardHeader>
                  <CardTitle className="text-xl font-bold ">
                    {product.product_name}
                  </CardTitle>
                  <CardDescription>
                    <img
                      alt={`${product.product_name}`}
                      className="object-contain p-1 rounded-xl mt-2"
                      src={`/images/category.jpg`}
                    />
                  </CardDescription>
                </CardHeader>

                {/* Card Content */}
                <CardContent className="">
                  <p className="text-sm ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse?
                  </p>

                  <div className="flex items-center mt-1 text-lg">
                    <strong className="">Price:</strong>
                    <span className="ml-2 text-primary font-semibold">
                      ${product.price}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;

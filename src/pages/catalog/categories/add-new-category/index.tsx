import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CirclePlus } from 'lucide-react';

// Schema for form validation
const CategorySchema = z.object({
  categoryName: z.string().min(1, 'Category Name is required'),
  categoryTitle: z.string().min(1, 'Category Title is required'),
  categoryDescription: z.string().min(1, 'Category Description is required'),
  image: z.any().optional(),
  metadata: z.array(
    z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      assignedCompany: z.string().optional(),
    })
  ),
});

const AddNewCategory: React.FC = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      categoryName: '',
      categoryTitle: '',
      categoryDescription: '',
      image: null,
      metadata: [{ metaTitle: '', metaDescription: '', assignedCompany: '' }],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'metadata',
  });

  const companies = [
    { id: '1', name: 'Allnet Medical' },
    { id: '2', name: 'Dynamic Medical' },
    { id: '3', name: 'Gryphone Medical' },
    { id: '4', name: 'Wincorn Medical' },
    { id: '5', name: 'Artema Medical' },
  ];

  const onSubmit = (data: any) => {
    console.log(data);
    toast.success('Category added successfully!');
    reset();
    navigate('/catalog/categories');
  };

  const onError = () => {
    toast.error('Please fill in all required fields');
  };

  // Get IDs of assigned companies
  const assignedCompanyIds = fields.map(field => field.assignedCompany);

  // Filter companies to show only unassigned ones
  const availableCompanies = companies.filter(company => !assignedCompanyIds.includes(company.id));

  return (
    <div className="p-4 w-full mx-auto">
      <h2 className="text-4xl font-semibold mb-8">Add Category</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        <section className="border-b border-primary pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="categoryName">Category Name</Label>
              <span className="text-red-500">*</span>
              <Input
                id="categoryName"
                {...register('categoryName')}
                placeholder="Type Product Name"
                className="mt-1"
              />
              {errors.categoryName && (
                <p className="text-red-500">{errors.categoryName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="categoryTitle">Category Title</Label>
              <span className="text-red-500">*</span>
              <Input
                id="categoryTitle"
                {...register('categoryTitle')}
                placeholder="Type Product Title"
                className="mt-1"
              />
              {errors.categoryTitle && (
                <p className="text-red-500">{errors.categoryTitle.message}</p>
              )}
            </div>
          </div>
          <div className="mt-3">
            <Label htmlFor="categoryDescription">Category Description</Label>
            <span className="text-red-500">*</span>
            <Textarea
              id="categoryDescription"
              {...register('categoryDescription')}
              placeholder="Type Product Description"
              className="mt-1"
              rows={3}
            />
            {errors.categoryDescription && (
              <p className="text-red-500">{errors.categoryDescription.message}</p>
            )}
          </div>

          {/* Image Upload Section */}
          <div className="mt-3">
            <Label htmlFor="image">Upload Image</Label>
            <Input
              type="file"
              id="image"
              {...register('image')}
              accept="image/*"
              className="mt-1"
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>
        </section>

        {fields.map((meta, index) => (
          <div key={meta.id} className="space-y-4 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`metaTitle-${index}`}>Meta Title</Label>
                <Input
                  id={`metaTitle-${index}`}
                  {...register(`metadata.${index}.metaTitle`)}
                  defaultValue={meta.metaTitle} // Ensure existing data is displayed
                  placeholder="Type Meta Title"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`assignedCompany-${index}`}>Assign to Company</Label>
                <Controller
                  name={`metadata.${index}.assignedCompany`}
                  control={control}
                  defaultValue={meta.assignedCompany} // Ensure existing data is displayed
                  render={({ field }) => {
                    // Calculate available companies specific to this index
                    const currentAssignedIds = fields
                      .filter((_, i) => i !== index) // Exclude current index to prevent filtering itself
                      .map(f => f.assignedCompany);
                    const filteredCompanies = companies.filter(
                      company => !currentAssignedIds.includes(company.id)
                    );

                    return (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id={`assignedCompany-${index}`} className="py-[1.2rem] mt-1 border-primary">
                          <SelectValue placeholder="Select a company" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredCompanies.map(company => (
                            <SelectItem key={company.id} value={company.id}>
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
              </div>
            </div>
            <div>
              <Label htmlFor={`metaDescription-${index}`}>Meta Description</Label>
              <Textarea
                id={`metaDescription-${index}`}
                {...register(`metadata.${index}.metaDescription`)}
                defaultValue={meta.metaDescription} // Ensure existing data is displayed
                placeholder="Type Meta Description"
                rows={3}
                className="mt-1"
              />
            </div>

            {fields.length > 1 && (
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant={'secondary'}
                  onClick={() => remove(index)}
                >
                  Remove Metadata
                </Button>
              </div>
            )}
          </div>
        ))}


        <div className="flex justify-center">
          <Button
            type="button"
            variant={'default'}
            onClick={() => append({ metaTitle: '', metaDescription: '', assignedCompany: '' })}
            disabled={availableCompanies.length === 1} // Disable button if no companies are left
          >
            <span className='pr-1'>Add MetaData</span>
            <CirclePlus className='w-6 h-6' />
          </Button>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" className="bg-primary text-white px-8 py-2 rounded">
            Add Category
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddNewCategory;

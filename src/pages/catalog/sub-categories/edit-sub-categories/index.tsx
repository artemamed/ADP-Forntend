import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import axios from 'axios';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Schema for form validation
const SubCategorySchema = z.object({
  categoryName: z.string().min(1, 'Category Name is required'),
  categoryTitle: z.string().min(1, 'Category Title is required'),
  metadata: z.array(
    z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      assignedCompany: z.string().optional(),
    })
  ),
});

type CategoryFormData = z.infer<typeof SubCategorySchema>;

const EditSubCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<CategoryFormData>({
    resolver: zodResolver(SubCategorySchema),
    defaultValues: {
      categoryName: '',
      categoryTitle: '',
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

  // Fetch category data and populate form
  useEffect(() => {
    if (categoryId) {
      axios.get(`/api/categories/${categoryId}`)
        .then((response) => {
          const categoryData = response.data;
          reset({
            categoryName: categoryData.categoryName,
            categoryTitle: categoryData.categoryTitle,
            metadata: categoryData.metadata || [{ metaTitle: '', metaDescription: '', assignedCompany: '' }],
          });
        })
        .catch(() => {
          toast.error('Failed to load category data');
        });
    }
  }, [categoryId, reset]);

  const onSubmit = (data: CategoryFormData) => {
    axios.put(`/api/categories/${categoryId}`, data)
      .then(() => {
        toast.success('Category updated successfully!');
        navigate('/catalog/categories');
      })
      .catch(() => {
        toast.error('Failed to update category');
      });
  };

  return (
    <div className="p-4 w-full mx-auto">
      <h2 className="text-4xl font-semibold mb-8">Edit Sub Category</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <section className="border-b border-primary pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="categoryName">Sub Category Name</Label>
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
              <Label htmlFor="categoryTitle">Sub Category Title</Label>
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
        </section>

        {fields.map((meta, index) => (
          <div key={meta.id} className="space-y-4 border-b border-primary pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`metaTitle-${index}`}>Meta Title</Label>
                <Input
                  id={`metaTitle-${index}`}
                  {...register(`metadata.${index}.metaTitle`)}
                  placeholder="Type Meta Title"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`assignedCompany-${index}`}>Assign to Company</Label>
                <Controller
                  name={`metadata.${index}.assignedCompany`}
                  control={control}
                  render={({ field }) => {
                    // Filter out companies that are already assigned in other fields
                    const currentAssignedIds = fields
                      .filter((_, i) => i !== index)
                      .map((field) => field.assignedCompany);
                    const filteredCompanies = companies.filter(
                      (company) => !currentAssignedIds.includes(company.id)
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
                          {filteredCompanies.map((company) => (
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
                placeholder="Type Meta Description"
                rows={3}
                className="mt-1"
              />
            </div>

            {fields.length > 1 && (
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove Metadata
                </Button>
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-center">
          <Button type="button" onClick={() => append({ metaTitle: '', metaDescription: '', assignedCompany: '' })} className="text-4xl bg-primary pb-3">
            +
          </Button>
        </div>
        <span className="flex justify-center">Click to Assign more Meta Data</span>

        <div className="mt-6 flex justify-end">
          <Button type="submit" className="bg-primary text-white px-8 py-2 rounded">
            Update Sub Category
          </Button>
        </div>
      </form>
    </div>
  );
};
export default EditSubCategory;

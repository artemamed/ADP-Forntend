import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Pencil } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const CompanyProfile = () => {
  const { serialCode } = useParams();
  return (
    <div>
      <div className="flex justify-between items-center">
        <Label className="text-2xl font-semibold">Company Profile</Label>
        <div className="flex space-x-2">
          <Link to={'edit'}>
            <Button
              variant={'default'}
              className="w-full md:w-fit"
            >
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;

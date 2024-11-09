import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CirclePlus, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import useClients from '@/hooks/useClients';

const Clients = () => {
  const { getClients } = useClients();
  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });
  const navigate = useNavigate();
  
  return (
    <div>
      <div>
        <div className="flex flex-col-reverse md:flex-row space-y-reverse space-y-3 md:space-y-0 justify-between md:items-center">
          <div className="relative w-full md:w-[50%] lg:w-[30%] ">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
            <Input
              type="text"
              placeholder="Search Client..."
              className="pl-10 "
              disabled={isLoading}
            />
          </div>
          <div className="flex space-x-2">
            <Button variant={'secondary'} className="w-full md:w-fit">
              Export
            </Button>
            <Link to={'company/add-new-company'}>
              <Button
                variant={'expandIcon'}
                Icon={CirclePlus}
                className="w-full md:w-fit"
                iconPlacement="left"
              >
                Add New Client
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <section className="mt-5 p-3">
        <Table>
          <TableHeader>
            <TableRow className="text-base ">
              <TableHead>Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Serial Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients &&
              clients.map((client) => (
                <TableRow
                  key={client.serialCode}
                  className="text-base hover:bg-primary/10 hover:cursor-pointer"
                  onClick={() => {
                    navigate(`company/profile/${client.serialCode}`);
                  }}
                >
                  <TableCell>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    {client.firstName} {client.lastName}
                  </TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.companyName}</TableCell>
                  <TableCell>{client.serialCode}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default Clients;

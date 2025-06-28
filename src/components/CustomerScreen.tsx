import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  User,
  Phone,
  Mail,
  MapPin,
  LayoutGrid,
  LayoutList,
  Edit,
  Trash2,
  PlusCircle,
  Save,
  Eye,
} from "lucide-react";
import { Label } from "./ui/label";

const CustomerScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] =
    useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  interface Customer {
    id: number;
    fname: string;
    lname: string;
    mname?: string;
    nin?: string;
    phone: string;
    address?: string;
    occupation?: string;
    status: string;
  }

  const deleteCustomer = (id: number) => {
    const confirmDelete = confirm(`Deleted user = ${id} ?`);
    if (confirmDelete) {
      //Delete the user
    }
  };

  const addUserDetails = (e) => {
    e.preventDefault();
    alert("User Details added");
  };

  const updateUserDetails = (e) => {
    e.preventDefault();
    alert("User Updated");
  };

  const customers: Customer[] = [
    {
      id: 1,
      fname: "John",
      lname: "Smith",
      phone: "(555) 123-4567",
      address: "123 Main St, Anytown, ST 12345",
      status: "Active",
      nin: "CFMKK0990IJSNNNN",
    },
    {
      id: 2,
      fname: "Sarah",
      lname: "Johnson",
      phone: "(555) 987-6543",
      address: "456 Oak Ave, Somewhere, ST 67890",
      status: "Interested",
      nin: "CFMKK0990IJSKNNN",
    },
    {
      id: 3,
      fname: "Mike",
      lname: "Davis",
      phone: "(555) 456-7890",
      address: "789 Pine Rd, Elsewhere, ST 11111",
      status: "Active",
      nin: "CFMKK0990IJSKNNL",
    },
    {
      id: 4,
      fname: "Emily",
      lname: "Wilson",
      phone: "(555) 234-5678",
      address: "321 Elm St, Nowhere, ST 22222",
      status: "Follow-up",
      nin: "CFMKK0990IJSKNNY",
    },
  ];

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.nin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Interested":
        return "bg-blue-100 text-blue-800";
      case "Follow-up":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const AddCustomerModal = () => (
    <DialogContent>
      <DialogTitle>
        <div className="flex gap-2 justify-start align-center">
          <PlusCircle /> <p className="m-0 p-0">Add Customer</p>
        </div>
      </DialogTitle>
      <div className="overflow-y-scroll">
        <form onSubmit={addUserDetails} method="post">
          <div className="columns-2">
            <div className="mb-3">
              <Label className="font-bold text-md">
                Last Name <i className="text-red-500">*</i>
              </Label>
              <Input id="lname" placeholder="Add Last Name" required />
            </div>
            <div className="mb-3">
              <Label className="font-bold text-md">
                First Name <i className="text-red-500">*</i>
              </Label>
              <Input id="fname" placeholder="Add First Name" required />
            </div>
          </div>
          <div className="mb-3">
            <Label className="font-bold text-md">Middle Name</Label>
            <Input id="mname" placeholder="Add Middle Name" />
          </div>
          <div className="mb-3">
            <Label className="font-bold text-md">NIN</Label>
            <Input id="nin" placeholder="Add NIN" />
          </div>
          <div className="mb-3">
            <Label className="font-bold text-md">
              Phone <i className="text-red-500">*</i>
            </Label>
            <Input id="phone" placeholder="Add Phone Number" required />
          </div>
          <div className="mb-3">
            <Label className="font-bold text-md">
              Address <i className="text-red-500">*</i>
            </Label>
            <Input id="address" placeholder="Add Address" required />
          </div>
          <div className="mb-3">
            <Label className="font-bold text-md">Occupation</Label>
            <Input id="occupation" placeholder="Add Occupation" />
          </div>
          <Button className="mt-4 px-10 bg-orange-500 hover:bg-orange-400">
            Save <Save />
          </Button>
        </form>
      </div>
    </DialogContent>
  );

  const UpdateCustomerModal = ({ customer }: { customer: Customer }) => (
    <DialogContent>
      <DialogTitle>
        <div className="flex gap-2 justify-start align-center">
          <PlusCircle /> <p className="m-0 p-0">Update Customer Details</p>
        </div>
      </DialogTitle>
      <div className="overflow-y-scroll">
        <form onSubmit={updateUserDetails} method="post">
          <div className="columns-2">
            <div className="mb-3">
              <Label className="font-bold text-md">
                Last Name <i className="text-red-500">*</i>
              </Label>
              <Input
                id="lname"
                defaultValue={customer.lname}
                placeholder="Add Last Name"
                required
              />
            </div>
            <div className="mb-3">
              <Label className="font-bold text-md">
                First Name <i className="text-red-500">*</i>
              </Label>
              <Input
                id="fname"
                defaultValue={customer.fname}
                placeholder="Add First Name"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <Label className="font-bold text-md">Middle Name</Label>
            <Input
              id="mname"
              defaultValue={customer.mname}
              placeholder="Add Middle Name"
            />
          </div>
          <div className="mb-3">
            <Label className="font-bold text-md">NIN</Label>
            <Input id="nin" defaultValue={customer.nin} placeholder="Add NIN" />
          </div>
          <div className="mb-3">
            <Label className="font-bold text-md">
              Phone <i className="text-red-500">*</i>
            </Label>
            <Input
              id="phone"
              defaultValue={customer.phone}
              placeholder="Add Phone Number"
              required
            />
          </div>
          <div className="mb-3">
            <Label className="font-bold text-md">
              Address <i className="text-red-500">*</i>
            </Label>
            <Input
              id="address"
              defaultValue={customer.address}
              placeholder="Add Address"
              required
            />
          </div>
          <div className="mb-3">
            <Label className="font-bold text-md">Occupation</Label>
            <Input
              id="occupation"
              defaultValue={customer.occupation}
              placeholder="Add Occupation"
            />
          </div>
          <Button
            type="submit"
            className="mt-4 px-10 bg-orange-500 hover:bg-orange-400"
          >
            Update <Save />
          </Button>
        </form>
      </div>
    </DialogContent>
  );

  const CustomerModal = ({ customer }: { customer: Customer }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>
          {customer.lname} {customer.fname}
        </DialogTitle>
        <DialogDescription>Customer Details</DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h4 className="font-semibold text-gray-700">Contact Information</h4>
          <div className="mt-2 space-y-2">
            <p>
              <strong>First Name:</strong> {customer.fname}
            </p>
            <p>
              <strong>Last Name:</strong> {customer.lname}
            </p>
            <p>
              <strong>Phone:</strong> {customer.phone}
            </p>
            <p>
              <strong>Address:</strong> {customer.address}
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700">Customer Details</h4>
          <div className="mt-2 space-y-2">
            <p>
              <strong>Status:</strong>{" "}
              <Badge className={getStatusColor(customer.status)}>
                {customer.status}
              </Badge>
            </p>
            <p>
              <strong>NIN:</strong> {customer.nin}
            </p>
          </div>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Customer Management
          </h2>
          <p className="text-gray-600">
            Manage your dealership's customer relationships
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-400 hover:bg-orange-500 text-gray-800">
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <AddCustomerModal />
        </Dialog>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-orange-200 focus:border-orange-400"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "cards" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("cards")}
            className={
              viewMode === "cards"
                ? "bg-orange-400 hover:bg-orange-500 text-gray-800"
                : ""
            }
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
            className={
              viewMode === "table"
                ? "bg-orange-400 hover:bg-orange-500 text-gray-800"
                : ""
            }
          >
            <LayoutList className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <>
              <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-gray-800">
                    {customer.lname} {customer.fname}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{customer.phone}</span>
                    </div>
                    <div className="flex items-start space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <span className="text-gray-600">{customer.address}</span>
                    </div>
                  </div>
                  <div className="columns-3">
                    <div>
                      <Dialog key={customer.id}>
                        <DialogTrigger asChild>
                          <Button className="bg-green-700 hover:bg-green-600 w-full">
                            <Eye /> View
                          </Button>
                        </DialogTrigger>
                        <CustomerModal customer={customer} />
                      </Dialog>
                    </div>
                    <div>
                      <Dialog key={customer.id}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="border-orange-500 text-orange-500 hover:bg-orange-400 w-full"
                          >
                            <Edit /> Edit
                          </Button>
                        </DialogTrigger>
                        <UpdateCustomerModal customer={customer} />
                      </Dialog>
                    </div>
                    <div>
                      <Button
                        onClick={() => deleteCustomer(customer.id)}
                        className="bg-red-500 hover:bg-red-400 w-full"
                      >
                        <Trash2 /> Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-orange-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>NIN</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow className="cursor-pointer hover:bg-orange-50">
                  <TableCell className="font-medium">
                    {customer.lname} {customer.fname}
                  </TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.nin}</TableCell>
                  <TableCell>{customer.status}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center align-center gap-2">
                      <div>
                        <Dialog key={customer.id}>
                          <DialogTrigger asChild>
                            <Button className="bg-orange-500 hover:bg-orange-400">
                              <Edit />
                            </Button>
                          </DialogTrigger>
                          <UpdateCustomerModal customer={customer} />
                        </Dialog>
                      </div>
                      <div>
                        <Button onClick={() => deleteCustomer(customer.id)} className="bg-red-500 hover:bg-red-400">
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CustomerScreen;

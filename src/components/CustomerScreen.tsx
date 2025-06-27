
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, User, Phone, Mail, MapPin, LayoutGrid, LayoutList } from "lucide-react";

const CustomerScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const customers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Anytown, ST 12345",
      status: "Active",
      lastVisit: "2024-01-15",
      totalPurchases: 2
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "(555) 987-6543",
      address: "456 Oak Ave, Somewhere, ST 67890",
      status: "Interested",
      lastVisit: "2024-01-10",
      totalPurchases: 0
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@email.com",
      phone: "(555) 456-7890",
      address: "789 Pine Rd, Elsewhere, ST 11111",
      status: "Active",
      lastVisit: "2024-01-12",
      totalPurchases: 1
    },
    {
      id: 4,
      name: "Emily Wilson",
      email: "emily.wilson@email.com",
      phone: "(555) 234-5678",
      address: "321 Elm St, Nowhere, ST 22222",
      status: "Follow-up",
      lastVisit: "2024-01-08",
      totalPurchases: 0
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert.brown@email.com",
      phone: "(555) 345-6789",
      address: "654 Maple Dr, Anywhere, ST 33333",
      status: "Active",
      lastVisit: "2024-01-14",
      totalPurchases: 3
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Interested":
        return "bg-blue-100 text-blue-800";
      case "Follow-up":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const CustomerModal = ({ customer }: { customer: any }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{customer.name}</DialogTitle>
        <DialogDescription>Customer Details</DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h4 className="font-semibold text-gray-700">Contact Information</h4>
          <div className="mt-2 space-y-2">
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Address:</strong> {customer.address}</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700">Customer Details</h4>
          <div className="mt-2 space-y-2">
            <p><strong>Status:</strong> <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge></p>
            <p><strong>Total Purchases:</strong> {customer.totalPurchases}</p>
            <p><strong>Last Visit:</strong> {new Date(customer.lastVisit).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Customer Management</h2>
          <p className="text-gray-600">Manage your dealership's customer relationships</p>
        </div>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-yellow-200 focus:border-yellow-400"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
            className={viewMode === 'cards' ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-800' : ''}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
            className={viewMode === 'table' ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-800' : ''}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <Dialog key={customer.id}>
              <DialogTrigger asChild>
                <Card className="border-yellow-200 hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-gray-800">
                      {customer.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {customer.totalPurchases} purchase{customer.totalPurchases !== 1 ? 's' : ''}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{customer.phone}</span>
                      </div>
                      <div className="flex items-start space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <span className="text-gray-600">{customer.address}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-yellow-100">
                      <p className="text-sm text-gray-500">
                        Last visit: {new Date(customer.lastVisit).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <CustomerModal customer={customer} />
            </Dialog>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-yellow-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Purchases</TableHead>
                <TableHead>Last Visit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <Dialog key={customer.id}>
                  <DialogTrigger asChild>
                    <TableRow className="cursor-pointer hover:bg-yellow-50">
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(customer.status)}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.totalPurchases}</TableCell>
                      <TableCell>{new Date(customer.lastVisit).toLocaleDateString()}</TableCell>
                    </TableRow>
                  </DialogTrigger>
                  <CustomerModal customer={customer} />
                </Dialog>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CustomerScreen;

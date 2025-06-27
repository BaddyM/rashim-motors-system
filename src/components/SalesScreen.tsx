
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, DollarSign, Calendar, User, Car } from "lucide-react";

const SalesScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const sales = [
    {
      id: 1,
      customer: "John Smith",
      vehicle: "2023 Toyota Camry",
      salePrice: 28500,
      saleDate: "2024-01-15",
      salesperson: "Alice Cooper",
      status: "Completed",
      commission: 1425
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      vehicle: "2022 Honda Accord",
      salePrice: 24200,
      saleDate: "2024-01-14",
      salesperson: "Bob Wilson",
      status: "Completed",
      commission: 1210
    },
    {
      id: 3,
      customer: "Mike Davis",
      vehicle: "2023 Ford F-150",
      salePrice: 42800,
      saleDate: "2024-01-12",
      salesperson: "Carol Martinez",
      status: "Completed",
      commission: 2140
    },
    {
      id: 4,
      customer: "Emily Wilson",
      vehicle: "2023 Chevrolet Malibu",
      salePrice: 26900,
      saleDate: "2024-01-10",
      salesperson: "David Johnson",
      status: "Pending",
      commission: 1345
    },
    {
      id: 5,
      customer: "Robert Brown",
      vehicle: "2023 Nissan Altima",
      salePrice: 25800,
      saleDate: "2024-01-08",
      salesperson: "Alice Cooper",
      status: "Completed",
      commission: 1290
    }
  ];

  const filteredSales = sales.filter(sale =>
    sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.salesperson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.salePrice, 0);
  const totalCommission = filteredSales.reduce((sum, sale) => sum + sale.commission, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Sales Management</h2>
          <p className="text-gray-600">Track and manage vehicle sales</p>
        </div>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800">
          <Plus className="h-4 w-4 mr-2" />
          New Sale
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-yellow-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">${totalSales.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Commission</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">${totalCommission.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              ${filteredSales.length > 0 ? Math.round(totalSales / filteredSales.length).toLocaleString() : '0'}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search sales..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-yellow-200 focus:border-yellow-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSales.map((sale) => (
          <Card key={sale.id} className="border-yellow-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <Badge className={getStatusColor(sale.status)}>
                  {sale.status}
                </Badge>
              </div>
              <CardTitle className="text-lg text-gray-800">
                Sale #{sale.id.toString().padStart(4, '0')}
              </CardTitle>
              <CardDescription className="text-xl font-bold text-yellow-600">
                ${sale.salePrice.toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{sale.customer}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Car className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{sale.vehicle}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{new Date(sale.saleDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-yellow-100 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Salesperson</p>
                  <p className="font-medium text-gray-800">{sale.salesperson}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Commission</p>
                  <p className="font-medium text-yellow-600">${sale.commission}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SalesScreen;

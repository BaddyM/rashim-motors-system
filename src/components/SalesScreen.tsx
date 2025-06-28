import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  DollarSign,
  Calendar,
  User,
  Car,
  LayoutGrid,
  LayoutList,
  Trash2,
  PlusCircle,
  ChevronDown,
  Save,
} from "lucide-react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";

const SalesScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCarPrice, setCurrentCarPrice] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  interface Sales {
    id: number;
    carName: string;
    soldAt: number;
    customer: string;
    salesPerson: string;
    isDebt: boolean;
    expectedPay?: string;
    status: string;
    createdAt: string;
  }

  interface Customer {
    id: number;
    name: string;
  }

  interface Car {
    id: number;
    name: string;
    price: number;
  }

  const cars: Car[] = [
    {
      id: 1,
      name: "Toyota Harrier",
      price: 19000000,
    },
    {
      id: 2,
      name: "Land Rover",
      price: 3400000000,
    },
    {
      id: 3,
      name: "Isuzu",
      price: 45000000,
    },
    {
      id: 4,
      name: "Toyota Mark X",
      price: 12000000,
    },
  ];

  const customers: Customer[] = [
    {
      id: 1,
      name: "Sarah Izuba",
    },
    {
      id: 2,
      name: "Ssetuba Isah",
    },
    {
      id: 3,
      name: "Brian Luutu",
    },
    {
      id: 4,
      name: "Fred Lukyamuzi",
    },
  ];

  const sales: Sales[] = [
    {
      id: 1,
      customer: "John Smith",
      carName: "2023 Toyota Camry",
      soldAt: 16000000,
      createdAt: "2024-01-15",
      salesPerson: "Alice Cooper",
      status: "Completed",
      isDebt: false,
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      carName: "2022 Honda Accord",
      soldAt: 12890000,
      createdAt: "2024-01-14",
      salesPerson: "Bob Wilson",
      status: "Completed",
      isDebt: false,
    },
    {
      id: 3,
      customer: "Mike Davis",
      carName: "2023 Ford F-150",
      soldAt: 45000000,
      createdAt: "2024-01-12",
      salesPerson: "Carol Martinez",
      status: "Completed",
      isDebt: true,
    },
    {
      id: 4,
      customer: "Emily Wilson",
      carName: "2023 Chevrolet Malibu",
      soldAt: 12000000,
      createdAt: "2024-01-10",
      salesPerson: "David Johnson",
      status: "Pending",
      isDebt: true,
    },
    {
      id: 5,
      customer: "Robert Brown",
      carName: "2023 Nissan Altima",
      soldAt: 27600000,
      createdAt: "2024-01-08",
      salesPerson: "Alice Cooper",
      status: "Completed",
      isDebt: false,
    },
  ];

  const deleteSales = (id: number) => {
    const confirmDelete = confirm(`Delete Sales ${id}`);
    if (confirmDelete) {
      //Delete sales
    }
  };

  const filteredSales = sales.filter(
    (sale) =>
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.salesPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.soldAt, 0);
  const totalDebtSales = filteredSales.reduce(
    (sum, sale) => (sale.isDebt == true ? sum + sale.soldAt : sum + 0),
    0
  );

  const SaleModal = ({ sale }: { sale: Sales }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Sale #{sale.id.toString().padStart(4, "0")}</DialogTitle>
        <DialogDescription>Sale Details</DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h4 className="font-semibold text-gray-700">Sale Information</h4>
          <div className="mt-2 space-y-2">
            <p>
              <strong>Sale ID:</strong> #{sale.id.toString().padStart(4, "0")}
            </p>
            <p>
              <strong>Customer:</strong> {sale.customer}
            </p>
            <p>
              <strong>Vehicle:</strong> {sale.carName}
            </p>
            <p>
              <strong>Sale Date:</strong>{" "}
              {new Date(sale.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Salesperson:</strong> {sale.salesPerson}
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700">Financial Details</h4>
          <div className="mt-2 space-y-2">
            <p>
              <strong>Sale Price:</strong>{" "}
              {Intl.NumberFormat("en-US", {
                currency: "UGX",
                style: "currency",
              }).format(sale.soldAt)}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <Badge className={getStatusColor(sale.status)}>
                {sale.status}
              </Badge>
            </p>
          </div>
        </div>
      </div>
    </DialogContent>
  );

  const submitSalesForm = (e) => {
    e.preventDefault();
    alert("Sales added");
  };

  const AddSales = () => (
    <DialogContent>
      <DialogTitle>
        <div className="flex gap-2 align-center">
          <PlusCircle /> Add Sales
        </div>
      </DialogTitle>
      <hr />
      <div>
        <form onSubmit={submitSalesForm} method="post">
          <div className="mb-3">
            <Label className="text-md text-bold">
              Car <i className="text-red-500">*</i>
            </Label>
            <Select
              onValueChange={(value) => {
                const selectedCar = cars.filter(
                  (carIndex) => carIndex.id == parseInt(value)
                );
                const currentCarPrice = selectedCar[0].price;
                const carPriceElement = document.querySelector(
                  "#currentCarPrice"
                ) as HTMLInputElement | null;
                if (carPriceElement) {
                  carPriceElement.value = `${Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "UGX",
                  }).format(currentCarPrice)}`;
                }
              }}
              name="car_name"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Car" />
              </SelectTrigger>
              <SelectContent>
                {cars.map((car, index) => (
                  <SelectItem key={index} value={`${car.id}`}>
                    {car.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-3">
            <Label className="text-md text-bold">
              Customer <i className="text-red-500">*</i>
            </Label>
            <Select name="customer">
              <SelectTrigger>
                <SelectValue placeholder="Select a Customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer, index) => (
                  <SelectItem key={index} value={`${customer.id}`}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-3">
            <Label className="text-md text-bold">Current Car Price</Label>
            <Input
              id="currentCarPrice"
              type="text"
              value={currentCarPrice}
              placeholder="Car Price"
              disabled={true}
            />
          </div>
          <div className="mb-3">
            <Label className="text-md text-bold">
              Paid Amount <i className="text-red-500">*</i>
            </Label>
            <Input
              id="paid_amount"
              type="number"
              placeholder="Enter Paid Amount"
            />
          </div>
          <div className="mb-3 flex gap-2">
            <Label className="text-md text-bold">Is Debt</Label>
            <div>
              <Checkbox
                id="isDebt"
                onCheckedChange={(value) => {
                  if (value) {
                    document
                      .querySelector("#debt_days_container")
                      .classList.remove("hidden");
                  } else {
                    document
                      .querySelector("#debt_days_container")
                      .classList.add("hidden");
                  }
                }}
                className="data-[state=checked]:bg-orange-500"
                style={{ width: "20px", height: "20px" }}
              />
            </div>
          </div>
          <div className="mb-3 hidden" id="debt_days_container">
            <Label className="text-md text-bold">Debt Days</Label>
            <Input
              id="debt_days"
              type="number"
              placeholder="Enter Expected Debt Days"
            />
          </div>
          <Button
          className="bg-orange-500 hover:bg-orange-400 px-10"
          >Save <Save/></Button>
        </form>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Sales Management
          </h2>
          <p className="text-gray-600">Track and manage vehicle sales</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-400 hover:bg-orange-500 text-gray-800">
              <Plus className="h-4 w-4 mr-2" />
              New Sale
            </Button>
          </DialogTrigger>
          <AddSales />
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {Intl.NumberFormat("en-US", {
                currency: "UGX",
                style: "currency",
              }).format(totalSales)}
            </div>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Sales in Debt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {Intl.NumberFormat("en-US", {
                currency: "UGX",
                style: "currency",
              }).format(totalDebtSales)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search sales..."
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSales.map((sale) => (
            <Dialog key={sale.id}>
              <DialogTrigger asChild>
                <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-white" />
                      </div>
                      <Badge className={getStatusColor(sale.status)}>
                        {sale.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-gray-800">
                      Sale #{sale.id.toString().padStart(4, "0")}
                    </CardTitle>
                    <CardDescription className="text-xl font-bold text-orange-600">
                      {Intl.NumberFormat("en-US", {
                        currency: "UGX",
                        style: "currency",
                      }).format(sale.soldAt)}
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
                        <span className="text-gray-600">{sale.carName}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">
                          {new Date(sale.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-orange-100 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Salesperson</p>
                        <p className="font-medium text-gray-800">
                          {sale.salesPerson}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Debt</p>
                        <p className="font-medium text-orange-600">
                          {sale.isDebt == true ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <SaleModal sale={sale} />
            </Dialog>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-orange-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sale ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Salesperson</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow className="cursor-pointer hover:bg-orange-50">
                  <TableCell className="font-medium">
                    #{sale.id.toString().padStart(4, "0")}
                  </TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.carName}</TableCell>
                  <TableCell>
                    {Intl.NumberFormat("en-US", {
                      currency: "UGX",
                      style: "currency",
                    }).format(sale.soldAt)}
                  </TableCell>
                  <TableCell>{sale.salesPerson}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(sale.status)}>
                      {sale.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center align-center">
                      <div>
                        <Button
                          onClick={() => deleteSales(sale.id)}
                          className="border-red-500 hover:bg-red-500 text-red-500"
                          variant="outline"
                        >
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

export default SalesScreen;

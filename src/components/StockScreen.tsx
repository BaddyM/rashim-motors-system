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
  DialogClose,
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
  Car,
  Edit,
  Trash2,
  LayoutGrid,
  LayoutList,
  PlusCircle,
  Save,
} from "lucide-react";
import { FormLabel } from "./ui/form";
import { Label } from "./ui/label";

const StockScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

    const showVehicleModal = () => {
    setIsVehicleModalOpen(true);
  };

  const hideVehicleModal = () => {
    setIsVehicleModalOpen(false);
  };

  const vehicles = [
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2023,
      color: "Silver",
      price: 28500,
      stock: 8,
      vin: "1HGBH41JXMN109186",
    },
    {
      id: 2,
      make: "Honda",
      model: "Accord",
      year: 2023,
      color: "Black",
      price: 31200,
      stock: 5,
      vin: "1HGCV1F3XLA004011",
    },
    {
      id: 3,
      make: "Ford",
      model: "F-150",
      year: 2023,
      color: "Blue",
      price: 45800,
      stock: 12,
      vin: "1FTFW1ET5DFC05105",
    },
    {
      id: 4,
      make: "Chevrolet",
      model: "Malibu",
      year: 2022,
      color: "Red",
      price: 24900,
      stock: 3,
      vin: "1G1ZD5ST8NF204821",
    },
    {
      id: 5,
      make: "Nissan",
      model: "Altima",
      year: 2023,
      color: "White",
      price: 26800,
      stock: 7,
      vin: "1N4BL4BV8NC123456",
    },
  ];

  const filteredVehicles = vehicles.filter((vehicle) =>
    `${vehicle.make} ${vehicle.model} ${vehicle.year}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (stock: number) => {
    if (stock <= 3) return { label: "Low", color: "bg-red-100 text-red-800" };
    if (stock <= 6)
      return { label: "Medium", color: "bg-yellow-100 text-yellow-800" };
    return { label: "Good", color: "bg-green-100 text-green-800" };
  };

  const addVehicleDetails = async () => {
    alert("Vehicle added");
    hideVehicleModal();
  };

  const VehicleModal = ({ vehicle }: { vehicle: any }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </DialogTitle>
        <DialogDescription>Vehicle Details</DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h4 className="font-semibold text-gray-700">Basic Information</h4>
          <div className="mt-2 space-y-2">
            <p>
              <strong>Make:</strong> {vehicle.make}
            </p>
            <p>
              <strong>Model:</strong> {vehicle.model}
            </p>
            <p>
              <strong>Year:</strong> {vehicle.year}
            </p>
            <p>
              <strong>Color:</strong> {vehicle.color}
            </p>
            <p>
              <strong>VIN:</strong> {vehicle.vin}
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700">Inventory Details</h4>
          <div className="mt-2 space-y-2">
            <p>
              <strong>Price:</strong> ${vehicle.price.toLocaleString()}
            </p>
            <p>
              <strong>Stock:</strong> {vehicle.stock} units
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <Badge className={getStockStatus(vehicle.stock).color}>
                {getStockStatus(vehicle.stock).label}
              </Badge>
            </p>
          </div>
        </div>
      </div>
    </DialogContent>
  );

  const AddVehicleModal = () => (
    <Dialog open={isVehicleModalOpen} onOpenChange={setIsVehicleModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <p>Add Vehicle</p> <Car />
            </div>
          </DialogTitle>
          <hr />
          <form onSubmit={addVehicleDetails} method="post">
            <div className="w-full">
              <div className="mb-2">
                <Label className="text-lg mb-2 font-bold">
                  Car <i className="text-red-500">*</i>
                </Label>
                <Input
                  id="car_name"
                  type="text"
                  placeholder="Add car name"
                  className="border-grey-200 focus:border-yellow-300"
                  required
                />
              </div>
              <div className="mb-2">
                <Label className="text-lg mb-2 font-bold">
                  Model <i className="text-red-500">*</i>
                </Label>
                <Input
                  id="car_model"
                  type="text"
                  placeholder="Add car model"
                  className="border-grey-200 focus:border-yellow-300"
                  required
                />
              </div>
              <div className="columns-2">
                <div className="mb-2">
                  <Label className="text-lg mb-2 font-bold">
                    Year <i className="text-red-500">*</i>
                  </Label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="Add year"
                    className="border-grey-200 focus:border-yellow-300"
                    required
                  />
                </div>
                {/*----------- Year ---------------*/}
                <div className="mb-2">
                  <Label className="text-lg mb-2 font-bold">
                    Color <i className="text-red-500">*</i>
                  </Label>
                  <Input
                    id="color"
                    type="text"
                    placeholder="Add color"
                    className="border-grey-200 focus:border-yellow-300"
                    required
                  />
                </div>
                {/*----------- Color ---------------*/}
              </div>
              <div className="columns-2">
                <div className="mb-2">
                  <Label className="text-lg mb-2 font-bold">
                    Price <i className="text-red-500">*</i>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Add price"
                    className="border-grey-200 focus:border-yellow-300"
                    required
                  />
                </div>
                {/*----------- Price ---------------*/}
                <div className="mb-2">
                  <Label className="text-lg mb-2 font-bold">
                    Stock <i className="text-red-500">*</i>
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="Add stock"
                    className="border-grey-200 focus:border-yellow-300"
                    required
                  />
                </div>
                {/*----------- Stock ---------------*/}
              </div>
              <div className="mb-2">
                <Label className="text-lg mb-2 font-bold">
                  VIN <i className="text-red-500">*</i>
                </Label>
                <Input
                  id="vin"
                  type="text"
                  placeholder="Add VIN"
                  className="border-grey-200 focus:border-yellow-300"
                  required
                />
              </div>
              {/*------------ VIN --------------*/}
              <div className="mb-2">
                <Label className="text-lg mb-2 font-bold">
                  Image <i className="text-red-500">*</i>
                </Label>
                <Input
                  id="car_image"
                  type="file"
                  accept="image/*"
                  placeholder="Add car image"
                  className="border-grey-200 focus:border-yellow-300"
                  required
                />
              </div>
              {/*------------ Image --------------*/}
            </div>
            <Button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400 text-black-400 mt-4 px-10"
            >
              Save <Save />
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Vehicle Inventory
          </h2>
          <p className="text-gray-600">
            Manage your dealership's vehicle stock
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              onClick={showVehicleModal}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-800"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <AddVehicleModal />
        </Dialog>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-yellow-200 focus:border-yellow-400"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "cards" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("cards")}
            className={
              viewMode === "cards"
                ? "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
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
                ? "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                : ""
            }
          >
            <LayoutList className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => {
            const stockStatus = getStockStatus(vehicle.stock);
            return (
              <Dialog key={vehicle.id}>
                <DialogTrigger asChild>
                  <Card className="border-yellow-200 hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Car className="h-8 w-8 text-yellow-600" />
                        <Badge className={stockStatus.color}>
                          {stockStatus.label} Stock
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-gray-800">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        VIN: {vehicle.vin}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Color</p>
                          <p className="font-medium text-gray-800">
                            {vehicle.color}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Stock</p>
                          <p className="font-medium text-gray-800">
                            {vehicle.stock} units
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold text-yellow-600">
                          ${vehicle.price.toLocaleString()}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-400 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <VehicleModal vehicle={vehicle} />
              </Dialog>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-yellow-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>VIN</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => {
                const stockStatus = getStockStatus(vehicle.stock);
                return (
                  <Dialog key={vehicle.id}>
                    <DialogTrigger asChild>
                      <TableRow className="cursor-pointer hover:bg-yellow-50">
                        <TableCell className="font-medium">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </TableCell>
                        <TableCell>{vehicle.vin}</TableCell>
                        <TableCell>{vehicle.color}</TableCell>
                        <TableCell>${vehicle.price.toLocaleString()}</TableCell>
                        <TableCell>{vehicle.stock} units</TableCell>
                        <TableCell>
                          <Badge className={stockStatus.color}>
                            {stockStatus.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-400 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </DialogTrigger>
                    <VehicleModal vehicle={vehicle} />
                  </Dialog>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default StockScreen;

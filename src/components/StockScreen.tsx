
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Car, Edit, Trash2 } from "lucide-react";

const StockScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const vehicles = [
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2023,
      color: "Silver",
      price: 28500,
      stock: 8,
      vin: "1HGBH41JXMN109186"
    },
    {
      id: 2,
      make: "Honda",
      model: "Accord",
      year: 2023,
      color: "Black",
      price: 31200,
      stock: 5,
      vin: "1HGCV1F3XLA004011"
    },
    {
      id: 3,
      make: "Ford",
      model: "F-150",
      year: 2023,
      color: "Blue",
      price: 45800,
      stock: 12,
      vin: "1FTFW1ET5DFC05105"
    },
    {
      id: 4,
      make: "Chevrolet",
      model: "Malibu",
      year: 2022,
      color: "Red",
      price: 24900,
      stock: 3,
      vin: "1G1ZD5ST8NF204821"
    },
    {
      id: 5,
      make: "Nissan",
      model: "Altima",
      year: 2023,
      color: "White",
      price: 26800,
      stock: 7,
      vin: "1N4BL4BV8NC123456"
    }
  ];

  const filteredVehicles = vehicles.filter(vehicle =>
    `${vehicle.make} ${vehicle.model} ${vehicle.year}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (stock: number) => {
    if (stock <= 3) return { label: "Low", color: "bg-red-100 text-red-800" };
    if (stock <= 6) return { label: "Medium", color: "bg-yellow-100 text-yellow-800" };
    return { label: "Good", color: "bg-green-100 text-green-800" };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Vehicle Inventory</h2>
          <p className="text-gray-600">Manage your dealership's vehicle stock</p>
        </div>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800">
          <Plus className="h-4 w-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-yellow-200 focus:border-yellow-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => {
          const stockStatus = getStockStatus(vehicle.stock);
          return (
            <Card key={vehicle.id} className="border-yellow-200 hover:shadow-md transition-shadow">
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
                    <p className="font-medium text-gray-800">{vehicle.color}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Stock</p>
                    <p className="font-medium text-gray-800">{vehicle.stock} units</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-yellow-600">
                    ${vehicle.price.toLocaleString()}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-yellow-400 text-yellow-600 hover:bg-yellow-50">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-400 text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StockScreen;

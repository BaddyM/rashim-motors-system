
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Users, DollarSign, TrendingUp } from "lucide-react";

const DashboardHome = () => {
  const stats = [
    {
      title: "Total Vehicles",
      value: "156",
      description: "In stock",
      icon: Car,
      color: "bg-yellow-400"
    },
    {
      title: "Active Customers",
      value: "89",
      description: "This month",
      icon: Users,
      color: "bg-yellow-500"
    },
    {
      title: "Monthly Sales",
      value: "$245,000",
      description: "+12% from last month",
      icon: DollarSign,
      color: "bg-yellow-600"
    },
    {
      title: "Revenue Growth",
      value: "23%",
      description: "Year over year",
      icon: TrendingUp,
      color: "bg-yellow-700"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Sunny Wheels</h2>
        <p className="text-gray-600">Here's an overview of your dealership performance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-yellow-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.color} p-2 rounded-md`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-yellow-200">
          <CardHeader>
            <CardTitle className="text-gray-800">Recent Sales</CardTitle>
            <CardDescription>Latest vehicle sales this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { vehicle: "2023 Honda Accord", customer: "John Smith", price: "$28,500" },
                { vehicle: "2022 Toyota Camry", customer: "Sarah Johnson", price: "$24,200" },
                { vehicle: "2023 Ford F-150", customer: "Mike Davis", price: "$42,800" }
              ].map((sale, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-yellow-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-800">{sale.vehicle}</p>
                    <p className="text-sm text-gray-600">{sale.customer}</p>
                  </div>
                  <div className="text-yellow-600 font-semibold">{sale.price}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardHeader>
            <CardTitle className="text-gray-800">Low Stock Alerts</CardTitle>
            <CardDescription>Vehicles running low in inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { model: "Toyota Prius", stock: 2, status: "Critical" },
                { model: "Honda Civic", stock: 5, status: "Low" },
                { model: "Ford Escape", stock: 3, status: "Low" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-yellow-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-800">{item.model}</p>
                    <p className="text-sm text-gray-600">{item.stock} units remaining</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Critical' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;

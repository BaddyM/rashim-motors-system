
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Users, DollarSign, TrendingUp } from "lucide-react";

const DashboardHome = () => {
  const stats = [
    {
      title: "Total Vehicles",
      value: "156",
      description: "In stock",
      icon: Car,
      color: "bg-orange-400"
    },
    {
      title: "Current Debtors",
      value: "89",
      description: "This month",
      icon: Users,
      color: "bg-orange-500"
    },
    {
      title: "Monthly Sales",
      value: "$245,000",
      description: "+12% from last month",
      icon: DollarSign,
      color: "bg-orange-600"
    },
    {
      title: "Revenue Growth",
      value: "23%",
      description: "Year over year",
      icon: TrendingUp,
      color: "bg-orange-700"
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
            <Card key={index} className="border-orange-200">
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
        <Card className="border-orange-200">
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
                <div key={index} className="flex items-center justify-between py-2 border-b border-orange-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-800">{sale.vehicle}</p>
                    <p className="text-sm text-gray-600">{sale.customer}</p>
                  </div>
                  <div className="text-orange-600 font-semibold">{sale.price}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-gray-800">Recent Debtors</CardTitle>
            <CardDescription>Latest vehicles sold on credit with balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "James Lubwama", date: "25-05-2025", amount: 2500000 },
                { name: "Sarah Okumu", date: "11-03-2025", amount: 55000000 },
                { name: "Ford Price", date: "12-02-2025", amount: 12780000 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-orange-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                  <div className="text-orange-600 font-semibold">{Intl.NumberFormat("en-US",{style:"currency",currency:"UGX"}).format(item.amount)}</div>
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


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Car, Users, ShoppingCart, DollarSign, UserCheck } from "lucide-react";
import StockScreen from "./StockScreen";
import CustomerScreen from "./CustomerScreen";
import SalesScreen from "./SalesScreen";
import UsersScreen from "./UsersScreen";
import DashboardHome from "./DashboardHome";

interface DashboardProps {
  onLogout: () => void;
}

type Screen = 'home' | 'stock' | 'customers' | 'sales' | 'users';

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');

  const navigationItems = [
    { id: 'home' as Screen, label: 'Dashboard', icon: Car },
    { id: 'stock' as Screen, label: 'Stock', icon: ShoppingCart },
    { id: 'customers' as Screen, label: 'Customers', icon: Users },
    { id: 'sales' as Screen, label: 'Sales', icon: DollarSign },
    { id: 'users' as Screen, label: 'Users', icon: UserCheck },
  ];

  const renderScreen = () => {
    switch (activeScreen) {
      case 'stock':
        return <StockScreen />;
      case 'customers':
        return <CustomerScreen />;
      case 'sales':
        return <SalesScreen />;
      case 'users':
        return <UsersScreen />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-400 rounded-lg flex items-center justify-center">
              <Car className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Rashim Motors Dashboard</h1>
          </div>
          <Button 
            onClick={onLogout} 
            variant="outline"
            className="border-orange-400 text-orange-600 hover:bg-orange-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-[calc(100vh-81px)] border-r border-orange-200">
          <div className="p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveScreen(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeScreen === item.id
                          ? 'bg-orange-400 text-white'
                          : 'text-gray-700 hover:bg-orange-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

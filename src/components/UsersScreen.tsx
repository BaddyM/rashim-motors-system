
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, User, Mail, Shield, Calendar, Edit, Trash2, LayoutGrid, LayoutList } from "lucide-react";

const UsersScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const users = [
    {
      id: 1,
      name: "Alice Cooper",
      email: "alice.cooper@sunnywheels.com",
      role: "Sales Manager",
      status: "Active",
      lastLogin: "2024-01-15",
      totalSales: 15,
      permissions: ["Sales", "Customers", "Reports"]
    },
    {
      id: 2,
      name: "Bob Wilson",
      email: "bob.wilson@sunnywheels.com",
      role: "Sales Associate",
      status: "Active",
      lastLogin: "2024-01-14",
      totalSales: 8,
      permissions: ["Sales", "Customers"]
    },
    {
      id: 3,
      name: "Carol Martinez",
      email: "carol.martinez@sunnywheels.com",
      role: "Finance Manager",
      status: "Active",
      lastLogin: "2024-01-13",
      totalSales: 12,
      permissions: ["Sales", "Finance", "Reports"]
    },
    {
      id: 4,
      name: "David Johnson",
      email: "david.johnson@sunnywheels.com",
      role: "Sales Associate",
      status: "Inactive",
      lastLogin: "2024-01-05",
      totalSales: 3,
      permissions: ["Sales", "Customers"]
    },
    {
      id: 5,
      name: "Eva Rodriguez",
      email: "eva.rodriguez@sunnywheels.com",
      role: "Administrator",
      status: "Active",
      lastLogin: "2024-01-15",
      totalSales: 0,
      permissions: ["All Access"]
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Administrator":
        return "bg-purple-100 text-purple-800";
      case "Sales Manager":
        return "bg-blue-100 text-blue-800";
      case "Finance Manager":
        return "bg-yellow-100 text-yellow-800";
      case "Sales Associate":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const UserModal = ({ user }: { user: any }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{user.name}</DialogTitle>
        <DialogDescription>User Details</DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h4 className="font-semibold text-gray-700">User Information</h4>
          <div className="mt-2 space-y-2">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> <Badge className={getRoleColor(user.role)}>{user.role}</Badge></p>
            <p><strong>Status:</strong> <Badge className={getStatusColor(user.status)}>{user.status}</Badge></p>
            <p><strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleDateString()}</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700">Performance & Access</h4>
          <div className="mt-2 space-y-2">
            <p><strong>Total Sales:</strong> {user.totalSales}</p>
            <p><strong>Permissions:</strong></p>
            <div className="flex flex-wrap gap-1 mt-1">
              {user.permissions.map((permission: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {permission}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">User Management</h2>
          <p className="text-gray-600">Manage dealership staff and permissions</p>
        </div>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
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
          {filteredUsers.map((user) => (
            <Dialog key={user.id}>
              <DialogTrigger asChild>
                <Card className="border-yellow-200 hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-gray-800">
                      {user.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {user.totalSales} sales completed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Shield className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{user.permissions.join(", ")}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">
                          Last login: {new Date(user.lastLogin).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 pt-2 border-t border-yellow-100">
                      <Button size="sm" variant="outline" className="flex-1 border-yellow-400 text-yellow-600 hover:bg-yellow-50">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-400 text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <UserModal user={user} />
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
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <Dialog key={user.id}>
                  <DialogTrigger asChild>
                    <TableRow className="cursor-pointer hover:bg-yellow-50">
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.totalSales}</TableCell>
                      <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="border-yellow-400 text-yellow-600 hover:bg-yellow-50">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-400 text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </DialogTrigger>
                  <UserModal user={user} />
                </Dialog>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UsersScreen;

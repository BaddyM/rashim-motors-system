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
  User,
  Mail,
  Shield,
  Calendar,
  Edit,
  Trash2,
  LayoutGrid,
  LayoutList,
  PlusCircle,
  Save,
} from "lucide-react";
import { Label } from "./ui/label";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const UsersScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
  }

  const users: User[] = [
    {
      id: 1,
      name: "Alice Cooper",
      email: "alice.cooper@sunnywheels.com",
      role: "SALES_AGENT",
      status: "Active",
      createdAt: "2025-01-04",
    },
    {
      id: 2,
      name: "Bob Wilson",
      email: "bob.wilson@sunnywheels.com",
      role: "CASHIER",
      status: "Active",
      createdAt: "2024-01-14",
    },
    {
      id: 3,
      name: "Carol Martinez",
      email: "carol.martinez@sunnywheels.com",
      role: "ADMIN",
      status: "Active",
      createdAt: "2024-01-13",
    },
    {
      id: 4,
      name: "David Johnson",
      email: "david.johnson@sunnywheels.com",
      role: "SALES_AGENT",
      status: "Inactive",
      createdAt: "2024-01-05",
    },
    {
      id: 5,
      name: "Eva Rodriguez",
      email: "eva.rodriguez@sunnywheels.com",
      role: "ADMIN",
      status: "Active",
      createdAt: "2024-01-15",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
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
      case "ADMIN":
        return "bg-purple-100 text-purple-800";
      case "SALES_AGENT":
        return "bg-blue-100 text-blue-800";
      case "CASHIER":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const UserModal = ({ user }: { user: User }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{user.name}</DialogTitle>
        <DialogDescription>User Details</DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h4 className="font-semibold text-gray-700">User Information</h4>
          <div className="mt-2 space-y-2">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong>{" "}
              <Badge className={getRoleColor(user.role)}>
                {user.role.toLowerCase()}
              </Badge>
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <Badge className={getStatusColor(user.status)}>
                {user.status}
              </Badge>
            </p>
            <p>
              <strong>Last Login:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </DialogContent>
  );

  const addUserAccount = (e) => {
    e.preventDefault();
    alert("Account added");
  };

  const updateUserAccount = (e) => {
    e.preventDefault();
    alert("Account updated");
  };

  const deleteUserAccount = (id: number) => {
    const confirmDelete = confirm(`Do you wish to continue?`);
    if (confirmDelete) {
      //Delete the user
    }
  };

  const AddUserModal = () => (
    <DialogContent>
      <DialogTitle>
        <div className="flex gap-2 align-center">
          <PlusCircle /> <p className="mb-0">Add User Account</p>
        </div>
      </DialogTitle>
      <hr />
      <div>
        <form onSubmit={addUserAccount} method="post">
          <div className="mb-2">
            <Label>Name</Label>
            <Input id="name" type="text" placeholder="Enter Name" required />
          </div>
          <div className="mb-2">
            <Label>Email</Label>
            <Input id="email" type="email" placeholder="Enter Email" required />
          </div>
          <div className="mb-2">
            <Label>Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="mb-2">
            <Label>Role</Label>
            <Select name={"role"}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"ADMIN"}>Admin</SelectItem>
                <SelectItem value={"SALES_AGENT"}>Sales Agent</SelectItem>
                <SelectItem value={"CASHIER"}>Cashier</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-400 px-10"
          >
            Save <Save />{" "}
          </Button>
        </form>
      </div>
    </DialogContent>
  );

  const UpdateUserModal = ({ user }: { user: User }) => (
    <DialogContent>
      <DialogTitle>
        <div className="flex gap-2 align-center">
          <PlusCircle /> <p className="mb-0">Update User Account</p>
        </div>
      </DialogTitle>
      <hr />
      <div>
        <form onSubmit={updateUserAccount} method="post">
          <Input defaultValue={user.id} type="hidden" />
          <div className="mb-2">
            <Label>Name</Label>
            <Input
              id="name"
              type="text"
              defaultValue={user.name}
              placeholder="Update Name"
              required
            />
          </div>
          <div className="mb-2">
            <Label>Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={user.email}
              placeholder="Update Email"
              required
            />
          </div>
          <div className="mb-2">
            <Label>Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Update Password"
              required
            />
          </div>
          <div className="mb-2">
            <Label>Role</Label>
            <Select name={"role"} defaultValue={user.role}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"ADMIN"}>Admin</SelectItem>
                <SelectItem value={"SALES_AGENT"}>Sales Agent</SelectItem>
                <SelectItem value={"CASHIER"}>Cashier</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-400 px-10"
          >
            Save <Save />{" "}
          </Button>
        </form>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            User Management
          </h2>
          <p className="text-gray-600">
            Manage dealership staff and permissions
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-400 hover:bg-orange-500 text-gray-800">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <AddUserModal />
        </Dialog>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
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
          {filteredUsers.map((user) => (
            <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role.toLowerCase().replace("_", " ")}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg text-gray-800">
                  {user.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 pt-2 border-t border-orange-100">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-orange-400 text-orange-600 hover:bg-orange-50"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <UpdateUserModal user={user} />
                  </Dialog>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteUserAccount(user.id)}
                    className="border-red-400 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-orange-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow className="cursor-pointer hover:bg-orange-50">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role.toLowerCase().replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-orange-400 text-orange-600 hover:bg-orange-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <UpdateUserModal user={user}/>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={()=>deleteUserAccount(user.id)}
                        className="border-red-400 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

export default UsersScreen;

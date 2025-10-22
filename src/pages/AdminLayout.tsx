import React from "react";
import { Link, useLocation } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import {
  Home,
  Building,
  UserPlus,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: <Home className="w-4 h-4" /> },
  { name: "Propriétés", path: "/proprietes", icon: <Building className="w-4 h-4" /> },
  { name: "Clients", path: "/listclients", icon: <UserPlus className="w-4 h-4" /> },
  { name: "Contrats", path: "/contrats", icon: <FileText className="w-4 h-4" /> },
  { name: "Paramètres", path: "/admin/settings", icon: <Settings className="w-4 h-4" /> },
  { name: "Déconnexion", path: "/logout", icon: <LogOut className="w-4 h-4" /> },
];

const AdminLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 text-white flex flex-col bg-gray-800">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">Admin</div>

        <nav className="flex-1 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-700 transition-colors ${
                location.pathname === item.path ? "bg-gray-900" : ""
              }`}
            >
              {item.icon}
              <span className="text-base">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-200 p-6">
        <AdminDashboard />
      </main>
    </div>
  );
};

export default AdminLayout;

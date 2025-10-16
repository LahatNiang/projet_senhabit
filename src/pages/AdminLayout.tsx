import React from "react";
import { Link, useLocation } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const menuItems = [
  { name: "Dashboard", path: "/admin" },
  { name: "Propriétés", path: "/admin/properties" },
  { name: "Client", path: "/listclients" },
  { name: "Paramètres", path: "/admin/settings" },
  { name: "Déconnexion", path: "/logout" },
];

const AdminLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">Admin</div>
        <nav className="flex-1 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-6 py-3 hover:bg-gray-800 ${
                location.pathname === item.path ? "bg-gray-900" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <AdminDashboard />
      </main>
    </div>
  );
};

export default AdminLayout;

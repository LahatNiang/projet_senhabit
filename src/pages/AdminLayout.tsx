import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  Home,
  FileText,
  LogOut,
  Building2,
} from "lucide-react";

const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex  relative min-h-screen bg-gradient-to-br from-[#fffdf8] via-[#fefaf3] to-[#fff9f6] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#14204D] text-white flex flex-col justify-between">
        <div>
          <div className="p-6 text-2xl font-bold flex items-center gap-2 border-b border-gray-700">
            <Link to="/" aria-label="Accueil">
            
            <Building2 className="w-6 h-6 text-[#FED9B7]" />
            </Link>
            Admin
          </div>
          <nav className="mt-6 flex flex-col space-y-2 px-4">
            <Link
              to="/admin"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#f7b79c] hover:text-[#14204D] transition"
            >
              <LayoutDashboard className="w-5 h-5" />
              Tableau de bord
            </Link>
            <Link
              to="/admin/clients"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#f7b79c] hover:text-[#14204D] transition"
            >
              <Users className="w-5 h-5" />
              Clients
            </Link>
            <Link
              to="/admin/proprietes"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#f7b79c] hover:text-[#14204D] transition"
            >
              <Home className="w-5 h-5" />
              Propriétés
            </Link>
            <Link
              to="/admin/contrats"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#f7b79c] hover:text-[#14204D] transition"
            >
              <FileText className="w-5 h-5" />
              Contrats
            </Link>
<Link
  to="/logout"
  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#f7b79c] hover:text-[#14204D] transition"
>
  <LogOut className="w-4 h-4" />
  Déconnexion
</Link>

          </nav>
        </div>

       <button>

</button>

      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

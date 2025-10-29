import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Home,
  Users,
  Building2,
  Eye,
  TrendingUp,
  Activity,
  PieChart as PieIcon,
} from "lucide-react";

const data = [
  { name: "Jan", ventes: 400 },
  { name: "Fév", ventes: 300 },
  { name: "Mar", ventes: 200 },
  { name: "Avr", ventes: 278 },
  { name: "Mai", ventes: 189 },
  { name: "Juin", ventes: 239 },
];

const COLORS = ["#4F46E5", "#626366ff", "#f3a622ff", "#8B5CF6"];

const AdminDashboard: React.FC = () => {
  const [nbProprietes, setNbProprietes] = useState(0);
  const [nbClients, setNbClients] = useState(0);
  const [nbVisites, setNbVisites] = useState(0);

  const API_URL = "http://localhost:3000";

  const fetchData = async () => {
    try {
      const [resProprietes, resClients] = await Promise.all([
        fetch(`${API_URL}/proprietes`),
        fetch(`${API_URL}/clients`),
      ]);

      const proprietesData = await resProprietes.json();
      const clientsData = await resClients.json();

      setNbProprietes(proprietesData.length);
      setNbClients(clientsData.length);
      setNbVisites(proprietesData.length + clientsData.length * 2); // exemple dynamique
    } catch (error) {
      console.error("Erreur de chargement des données :", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalBiens = nbProprietes + nbClients;
  const pieData = [
    { name: "Propriétés", value: nbProprietes },
    { name: "Clients", value: nbClients },
    { name: "Visites", value: nbVisites },
  ];

  return (
    <div className="p-6 ">
      <h1 className="text-3xl text-[#14204D] font-bold text-gray-800 mb-10 flex items-center gap-2">
        <Home className="text-[#FED9B7] w-8 h-8" />
        Tableau de bord
      </h1>

      {/* === Statistiques principales === */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-[#14204D] text-[#FED9B7] shadow rounded-2xl p-5 text-center flex flex-col items-center justify-center hover:scale-105 transition">
          <Home className="w-8 h-8 mb-2 text-[#FED9B7]" />
          <h1 className=" text-[#FED9B7] ">Total Biens</h1>
          <p className="text-3xl font-bold text-[#FED9B7]">{totalBiens}</p>
        </div>

        <div className="bg-[#FED9B7] shadow rounded-2xl p-5 text-center flex flex-col items-center justify-center hover:scale-105 transition">
          <Building2 className="w-8 h-8 mb-2 text-[#14204D]" />
          <h1 className=" text-[#14204D]">Propriétés</h1>
          <p className="text-3xl font-bold text-[#14204D]">{nbProprietes}</p>
        </div>

        <div className="bg-gray-300 shadow rounded-2xl p-5 text-center flex flex-col items-center justify-center hover:scale-105 transition">
          <Users className="w-8 h-8 mb-2 text-[#14204D]" />
          <h1 className="text-sm text-[#14204D]">Clients actifs</h1>
          <p className="text-3xl font-bold text-[#14204D]">{nbClients}</p>
        </div>

        <div className="bg-[#f3a622ff] shadow rounded-2xl p-5 text-center flex flex-col items-center justify-center hover:scale-105 transition">
          <Eye className="w-8 h-8 mb-2 text-[#14204D]" />
          <h1 className="text-sm text-[#14204D]">Visites</h1>
          <p className="text-3xl font-bold text-[#14204D]">{nbVisites}</p>
        </div>
      </div>

      {/* === Graphiques === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white shadow rounded-2xl p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <TrendingUp className="text-indigo-500" />
            Ventes Mensuelles
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventes" fill="#4F46E5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow rounded-2xl p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <PieIcon className="text-green-600" />
            Répartition des Données
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* === Mini cartes d’évolution === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
          <Activity className="text-indigo-600 w-10 h-10" />
          <div>
            <p className="text-gray-600 text-sm">Taux de Croissance</p>
            <h3 className="text-xl font-bold text-indigo-700">+12%</h3>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
          <TrendingUp className="text-green-600 w-10 h-10" />
          <div>
            <p className="text-gray-600 text-sm">Performance Mensuelle</p>
            <h3 className="text-xl font-bold text-green-700">+8.5%</h3>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
          <PieIcon className="text-yellow-500 w-10 h-10" />
          <div>
            <p className="text-gray-600 text-sm">Taux d’Occupation</p>
            <h3 className="text-xl font-bold text-yellow-600">78%</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

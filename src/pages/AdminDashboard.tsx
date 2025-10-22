import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Home, Users, Building2, Eye } from "lucide-react";

const data = [
  { name: "Jan", ventes: 400 },
  { name: "Fév", ventes: 300 },
  { name: "Mar", ventes: 200 },
  { name: "Avr", ventes: 278 },
  { name: "Mai", ventes: 189 },
  { name: "Juin", ventes: 239 },
];

const AdminDashboard: React.FC = () => {
  const [nbProprietes, setNbProprietes] = useState(0);
  const [nbClients, setNbClients] = useState(0);
  const [nbVisites, setNbVisites] = useState(0);

  const API_URL = "http://localhost:3000";

  // 🟢 Charger les données dynamiquement
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
      setNbVisites(proprietesData.length + clientsData.length); // exemple de "visites" simulées
    } catch (error) {
      console.error("Erreur de chargement des données :", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // mise à jour toutes les 5 sec
    return () => clearInterval(interval);
  }, []);

  const totalBiens = nbProprietes + nbClients;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Tableau de bord
      </h1>

      {/* === Statistiques dynamiques === */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {/* Total Biens */}
        <div className="bg-indigo-700 text-white shadow rounded-2xl p-5 text-center flex flex-col items-center justify-center">
          <Home className="w-8 h-8 mb-2 text-yellow-300" />
          <h1 className="text-sm opacity-80">Total Biens</h1>
          <p className="text-3xl font-bold text-yellow-300">{totalBiens}</p>
        </div>

        {/* Propriétés */}
        <div className="bg-green-200 shadow rounded-2xl p-5 text-center flex flex-col items-center justify-center">
          <Building2 className="w-8 h-8 mb-2 text-green-600" />
          <h1 className="text-sm text-gray-700">Propriétés</h1>
          <p className="text-3xl font-bold text-green-700">{nbProprietes}</p>
        </div>

        {/* Clients */}
        <div className="bg-yellow-200 shadow rounded-2xl p-5 text-center flex flex-col items-center justify-center">
          <Users className="w-8 h-8 mb-2 text-orange-500" />
          <h1 className="text-sm text-gray-700">Clients actifs</h1>
          <p className="text-3xl font-bold text-orange-600">{nbClients}</p>
        </div>

        {/* Visites */}
        <div className="bg-red-100 shadow rounded-2xl p-5 text-center flex flex-col items-center justify-center">
          <Eye className="w-8 h-8 mb-2 text-purple-500" />
          <h1 className="text-sm text-gray-700">Visites</h1>
          <p className="text-3xl font-bold text-purple-600">{nbVisites}</p>
        </div>
      </div>

      {/* === Graphique === */}
      <div className="bg-white shadow rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Ventes Mensuelles
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ventes" fill="#090842ff" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;

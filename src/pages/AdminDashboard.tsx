import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", ventes: 400 },
  { name: "Fév", ventes: 300 },
  { name: "Mar", ventes: 200 },
  { name: "Avr", ventes: 278 },
  { name: "Mai", ventes: 189 },
  { name: "Juin", ventes: 239 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Tableau de bord</h1>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-2xl p-5 text-center">
          <h2 className="text-sm text-gray-500">Total Biens</h2>
          <p className="text-2xl font-bold text-indigo-600">120</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-5 text-center">
          <h2 className="text-sm text-gray-500">Propriétaires</h2>
          <p className="text-2xl font-bold text-green-600">45</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-5 text-center">
          <h2 className="text-sm text-gray-500">Clients actifs</h2>
          <p className="text-2xl font-bold text-orange-500">32</p>
        </div>
      </div>

      {/* Graphique Ventes */}
      <div className="bg-white shadow rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Ventes Mensuelles</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ventes" fill="#5e2de4ff" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;

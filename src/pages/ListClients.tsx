import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserPlus, ArrowLeft } from "lucide-react"; 
import type { Client } from "../types/client";

const ListClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [editingClientId, setEditingClientId] = useState<number | null>(null);

  const API_URL = "http://localhost:3000";

  const getClients = async () => {
    try {
      const res = await fetch(`${API_URL}/clients`);
      if (!res.ok) throw new Error("Erreur lors de la récupération des clients");
      const data = await res.json();
      setClients(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientData = { nom, email, telephone };
//modification
    try {
      if (editingClientId) {
        const res = await fetch(`${API_URL}/clients/${editingClientId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clientData),
        });
        if (!res.ok) throw new Error("Erreur lors de la modification");
        Swal.fire("Modifié !", "Client modifié avec succès.", "success");
        setEditingClientId(null);
      } else {
        const res = await fetch(`${API_URL}/clients`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clientData),
        });
        if (!res.ok) throw new Error("Erreur lors de l'ajout");
        Swal.fire("Ajouté !", "Client ajouté avec succès.", "success");
      }

      setNom("");
      setEmail("");
      setTelephone("");
      getClients();
    } catch (error) {
      console.error(error);
      Swal.fire("Erreur", "Une erreur est survenue", "error");
    }
  };
//supprimer
  const deleteClient = (id: number, nom: string) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: `Voulez-vous vraiment supprimer le client ${nom} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_URL}/clients/${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Erreur lors de la suppression");
          Swal.fire("Supprimé !", `Client ${nom} supprimé.`, "success");
          getClients();
        } catch (error) {
          console.error(error);
          Swal.fire("Erreur", "Impossible de supprimer", "error");
        }
      }
    });
  };
//Modifier
  const editClient = (client: Client) => {
    setEditingClientId(client.id);
    setNom(client.nom);
    setEmail(client.email);
    setTelephone(client.telephone);
  };

  // 👉 bouton retour
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg max-w-6xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#FFD700] via-[#FFC107] to-[#FF9800]">
          {editingClientId ? "Modifier un client" : "Ajouter un client"}
        </h1>

        
      </div>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-6 rounded-xl shadow-inner grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Nom complet"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 rounded-lg outline-none"
          required
        />
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 rounded-lg outline-none"
          required
        />
        <input
          type="text"
          placeholder="Téléphone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          className="border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 rounded-lg outline-none"
          required
        />
          <div className="md:col-span-3 flex justify-between items-center"> 
            <button
          onClick={handleBack}
          className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>
        
        
          <button
            type="submit"
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
          >
            <UserPlus className="w-4 h-4" />
            {editingClientId ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </form>

      {/* Liste des clients */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FF9800]">
            <tr>
              <th className="p-3 border text-left text-gray-700">ID</th>
              <th className="p-3 border text-left text-gray-700">Nom</th>
              <th className="p-3 border text-left text-gray-700">Email</th>
              <th className="p-3 border text-left text-gray-700">Téléphone</th>
              <th className="p-3 border text-center text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.length > 0 ? (
              clients.map((client) => (
                <tr key={client.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 border">{client.id}</td>
                  <td className="p-3 border">{client.nom}</td>
                  <td className="p-3 border">{client.email}</td>
                  <td className="p-3 border">{client.telephone}</td>
                  <td className="p-3 border text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                        onClick={() => editClient(client)}
                      >
                        Modifier
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                        onClick={() => deleteClient(client.id, client.nom)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  Aucun client disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListClients;

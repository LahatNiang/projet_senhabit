import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserPlus, ArrowLeft } from "lucide-react";
import type { Client } from "../types/client";

const ListClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = "http://localhost:3000";

  // 🔹 Récupération des clients
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

  // 🔹 Ajout d’un client
  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newClient = { nom, email, telephone };

      const res = await fetch(`${API_URL}/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout");

      Swal.fire("Ajouté !", "Client ajouté avec succès.", "success");
      setNom("");
      setEmail("");
      setTelephone("");
      setShowAddModal(false);
      getClients();
    } catch (error) {
      console.error(error);
      Swal.fire("Erreur", "Une erreur est survenue", "error");
    }
  };

  // 🔹 Modification
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient) return;

    try {
      const res = await fetch(`${API_URL}/clients/${editingClient.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingClient),
      });

      if (!res.ok) throw new Error("Erreur lors de la modification");

      Swal.fire("Modifié !", "Client modifié avec succès.", "success");
      setShowModal(false);
      setEditingClient(null);
      getClients();
    } catch (error) {
      console.error(error);
      Swal.fire("Erreur", "Impossible de modifier", "error");
    }
  };

  // 🔹 Suppression
  const deleteClient = (id: number | string, nom: string) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: `Voulez-vous vraiment supprimer ${nom} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_URL}/clients/${id}`, {
            method: "DELETE",
          });

          if (!res.ok) throw new Error("Erreur lors de la suppression");

          Swal.fire("Supprimé !", `${nom} a été supprimé.`, "success");
          getClients();
        } catch (error) {
          console.error(error);
          Swal.fire("Erreur", "Suppression impossible", "error");
        }
      }
    });
  };

  // 🔹 Ouvrir le modal de modification
  const editClient = (client: Client) => {
    setEditingClient({ ...client });
    setShowModal(true);
  };

  // 🔹 Retour
  const handleBack = () => window.history.back();

  // 🔹 Filtrage des clients
  const filteredClients = clients.filter((client) =>
    client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.telephone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 rounded-2xl shadow-lg max-w-6xl mx-auto mt-10">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-gray-400 transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
        >
          <UserPlus className="w-4 h-4" />
          Ajouter un client
        </button>
      </div>

      {/* 🔍 Barre de recherche */}
      <div className="relative w-full md:w-1/3 mb-8">
        <input
          type="text"
          placeholder="Rechercher"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-black rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-100"
        />
        <svg
          className="w-5 h-5 text-gray-600 absolute left-3 top-2.5 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
          />
        </svg>
      </div>

      {/* 🧾 Tableau des clients */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-300 text-gray-800">
            <tr>
              <th className="p-3 border text-left">ID</th>
              <th className="p-3 border text-left">Nom</th>
              <th className="p-3 border text-left">Email</th>
              <th className="p-3 border text-left">Téléphone</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
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
                  Aucun client trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ➕ MODAL AJOUT */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[400px] relative">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Ajouter un client</h2>
            <form onSubmit={handleAddClient} className="space-y-3">
              <input
                type="text"
                placeholder="Nom complet"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none"
                required
              />
              <input
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none"
                required
              />
              <input
                type="text"
                placeholder="Téléphone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none"
                required
              />
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✏️ MODAL MODIFICATION */}
      {showModal && editingClient && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[400px] relative">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Modifier le client</h2>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="text"
                value={editingClient.nom}
                onChange={(e) =>
                  setEditingClient({ ...editingClient, nom: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Nom"
              />
              <input
                type="email"
                value={editingClient.email}
                onChange={(e) =>
                  setEditingClient({ ...editingClient, email: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Email"
              />
              <input
                type="text"
                value={editingClient.telephone}
                onChange={(e) =>
                  setEditingClient({ ...editingClient, telephone: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Téléphone"
              />
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListClients;

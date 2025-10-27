import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Home, ArrowLeft, Plus ,Search} from "lucide-react";

interface Propriete {
  id: number;
  titre: string;
  type: string;
  adresse: string;
  prix: number;
  superficie: number;
  description: string;
  proprietaire: string;
}

const ListProprietes: React.FC = () => {
  const [proprietes, setProprietes] = useState<Propriete[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPropriete, setEditingPropriete] = useState<Propriete | null>(null);

  // champs ajout
  const [titre, setTitre] = useState("");
  const [type, setType] = useState("");
  const [adresse, setAdresse] = useState("");
  const [prix, setPrix] = useState<number | string>("");
  const [superficie, setSuperficie] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [proprietaire, setProprietaire] = useState("");

  const API_URL = "http://localhost:3000";

  // récupère les propriétés
  const getProprietes = async () => {
    try {
      const res = await fetch(`${API_URL}/proprietes`);
      if (!res.ok) throw new Error(`GET /proprietes failed: ${res.status}`);
      const data = await res.json();
      setProprietes(data);
    } catch (error) {
      console.error("getProprietes error:", error);
      Swal.fire("Erreur", "Impossible de charger les propriétés (voir console).", "error");
    }
  };

  useEffect(() => {
    getProprietes();
  }, []);

  // ajouter : NE PAS envoyer id (json-server génère l'id)
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPropriete = {
      titre,
      type,
      adresse,
      prix: Number(prix),
      superficie: Number(superficie),
      description,
      proprietaire,
    };

    try {
      const res = await fetch(`${API_URL}/proprietes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPropriete),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("POST failed:", res.status, text);
        throw new Error(`POST failed: ${res.status}`);
      }

      Swal.fire("Ajouté !", "Propriété enregistrée avec succès", "success");

      // reset fields + close modal
      setTitre("");
      setType("");
      setAdresse("");
      setPrix("");
      setSuperficie("");
      setDescription("");
      setProprietaire("");
      setShowAddModal(false);

      await getProprietes();
    } catch (error) {
      console.error("handleAdd error:", error);
      Swal.fire("Erreur", "Une erreur est survenue lors de l'ajout (voir console).", "error");
    }
  };

  // suppression (affiche erreurs détaillées si échec)
  const deletePropriete = (id: number | string, titre: string) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: `Supprimer la propriété "${titre}" ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        const res = await fetch(`${API_URL}/proprietes/${encodeURIComponent(String(id))}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          const text = await res.text();
          console.error("DELETE failed:", res.status, text);
          throw new Error(`DELETE failed: ${res.status}`);
        }
        Swal.fire("Supprimé !", "La propriété a été supprimée", "success");
        getProprietes();
      } catch (error) {
        console.error("deletePropriete error:", error);
        Swal.fire("Erreur", "Impossible de supprimer (voir console).", "error");
      }
    });
  };

  // ouvrir modal modification
  const editPropriete = (p: Propriete) => {
    setEditingPropriete({ ...p });
    setShowModal(true);
  };

  // soumettre modification (PUT)
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPropriete) return;

    try {
      const res = await fetch(`${API_URL}/proprietes/${encodeURIComponent(String(editingPropriete.id))}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPropriete),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("PUT failed:", res.status, text);
        throw new Error(`PUT failed: ${res.status}`);
      }

      Swal.fire("Modifié !", "Propriété mise à jour avec succès", "success");
      setShowModal(false);
      setEditingPropriete(null);
      getProprietes();
    } catch (error) {
      console.error("handleEditSubmit error:", error);
      Swal.fire("Erreur", "Impossible de modifier (voir console).", "error");
    }
  };

  const handleBack = () => window.history.back();

  const filteredProprietes = proprietes.filter((p) =>
    [p.titre, p.type, p.adresse, p.proprietaire]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 rounded-2xl shadow-lg max-w-7xl mx-auto mt-10">
      {/* header */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={handleBack} className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-gray-400 transition text-sm">
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>

        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm">
          <Plus className="w-4 h-4" /> Ajouter une propriété
        </button>
      </div>
{/* ====== BARRE DE RECHERCHE ====== */}
<div className="relative w-full md:w-1/3 mb-6">
  <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
  <input
    type="text"
    placeholder="Rechercher un contrat..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full border border-gray-400 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
  />
</div>

     

      {/* tableau */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-300 text-gray-800">
            <tr>
              <th className="p-3 border">Titre</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Adresse</th>
              <th className="p-3 border">Prix</th>
              <th className="p-3 border">Superficie</th>
              <th className="p-3 border">Propriétaire</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProprietes.length > 0 ? (
              filteredProprietes.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 border">{p.titre}</td>
                  <td className="p-3 border">{p.type}</td>
                  <td className="p-3 border">{p.adresse}</td>
                  <td className="p-3 border">{p.prix.toLocaleString()} FCFA</td>
                  <td className="p-3 border">{p.superficie} m²</td>
                  <td className="p-3 border">{p.proprietaire}</td>
                  <td className="p-3 border text-center">
                    <div className="flex justify-center gap-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm" onClick={() => editPropriete(p)}>
                        Modifier
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm" onClick={() => deletePropriete(p.id, p.titre)}>
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  Aucune propriété trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* modal ajouter */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[500px]">
            <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Ajouter une propriété</h2>
            <form onSubmit={handleAdd} className="grid grid-cols-1 gap-3">
              <input type="text" placeholder="Titre" value={titre} onChange={(e) => setTitre(e.target.value)} className="border p-2 rounded" required />
              <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded" required />
              <input type="text" placeholder="Adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} className="border p-2 rounded" required />
              <input type="number" placeholder="Prix" value={prix} onChange={(e) => setPrix(e.target.value)} className="border p-2 rounded" required />
              <input type="number" placeholder="Superficie (m²)" value={superficie} onChange={(e) => setSuperficie(e.target.value)} className="border p-2 rounded" required />
              <input type="text" placeholder="Propriétaire" value={proprietaire} onChange={(e) => setProprietaire(e.target.value)} className="border p-2 rounded" required />
              <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded" rows={3} />
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
                  Annuler
                </button>
                <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* modal modifier */}
      {showModal && editingPropriete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[500px]">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Modifier la propriété</h2>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input type="text" value={editingPropriete.titre} onChange={(e) => setEditingPropriete({ ...editingPropriete, titre: e.target.value })} className="w-full border p-2 rounded" />
              <input type="text" value={editingPropriete.type} onChange={(e) => setEditingPropriete({ ...editingPropriete, type: e.target.value })} className="w-full border p-2 rounded" />
              <input type="text" value={editingPropriete.adresse} onChange={(e) => setEditingPropriete({ ...editingPropriete, adresse: e.target.value })} className="w-full border p-2 rounded" />
              <input type="number" value={editingPropriete.prix} onChange={(e) => setEditingPropriete({ ...editingPropriete, prix: Number(e.target.value) })} className="w-full border p-2 rounded" />
              <input type="number" value={editingPropriete.superficie} onChange={(e) => setEditingPropriete({ ...editingPropriete, superficie: Number(e.target.value) })} className="w-full border p-2 rounded" />
              <input type="text" value={editingPropriete.proprietaire} onChange={(e) => setEditingPropriete({ ...editingPropriete, proprietaire: e.target.value })} className="w-full border p-2 rounded" />
              <textarea value={editingPropriete.description} onChange={(e) => setEditingPropriete({ ...editingPropriete, description: e.target.value })} className="w-full border p-2 rounded" rows={3} />
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">Annuler</button>
                <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProprietes;

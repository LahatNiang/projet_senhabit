import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Home, ArrowLeft } from "lucide-react";
//import type { Propriete } from "../types/Propriete";

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
  const [titre, setTitre] = useState("");
  const [type, setType] = useState("");
  const [adresse, setAdresse] = useState("");
  const [prix, setPrix] = useState<number | string>("");
  const [superficie, setSuperficie] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [proprietaire, setProprietaire] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const API_URL = "http://localhost:3000";

  // 🔹 Récupérer les propriétés
  const getProprietes = async () => {
    try {
      const res = await fetch(`${API_URL}/proprietes`);
      if (!res.ok) throw new Error("Erreur lors du chargement");
      const data = await res.json();
      setProprietes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProprietes();
  }, []);

  // 🔹 Ajouter ou modifier une propriété
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const proprieteData = {
      titre,
      type,
      adresse,
      prix: Number(prix),
      superficie: Number(superficie),
      description,
      proprietaire,
      
    };

    try {
      if (editingId) {
        const res = await fetch(`${API_URL}/proprietes/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(proprieteData),
        });
        if (!res.ok) throw new Error("Erreur de modification");
        Swal.fire("Modifié !", "Propriété mise à jour avec succès", "success");
        setEditingId(null);
      } else {
        const res = await fetch(`${API_URL}/proprietes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(proprieteData),
        });
        if (!res.ok) throw new Error("Erreur d’ajout");
        Swal.fire("Ajouté !", "Propriété enregistrée avec succès", "success");
      }

      // Réinitialiser le formulaire
      setTitre("");
      setType("");
      setAdresse("");
      setPrix("");
      setSuperficie("");
      setDescription("");
      setProprietaire("");
      

      getProprietes();
    } catch (error) {
      console.error(error);
      Swal.fire("Erreur", "Une erreur est survenue", "error");
    }
  };

  // 🔹 Supprimer
  const deletePropriete = (id: number, titre: string) => {
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
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_URL}/proprietes/${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Erreur de suppression");
          Swal.fire("Supprimé !", "La propriété a été supprimée", "success");
          getProprietes();
        } catch (error) {
          console.error(error);
          Swal.fire("Erreur", "Impossible de supprimer", "error");
        }
      }
    });
  };

  // 🔹 Modifier
  const editPropriete = (p: Propriete) => {
    setEditingId(p.id);
    setTitre(p.titre);
    setType(p.type);
    setAdresse(p.adresse);
    setPrix(p.prix);
    setSuperficie(p.superficie);
    setDescription(p.description);
    setProprietaire(p.proprietaire);
    
  };

  // 🔹 Retour
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg max-w-7xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#FFD700] via-[#FFC107] to-[#FF9800]">
          {editingId ? "Modifier une propriété" : "Ajouter une propriété"}
        </h1>

        
      </div>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-6 rounded-xl shadow-inner grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Titre du bien"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-300"
          required
        />
        <input
          type="text"
          placeholder="Type (Appartement, Maison...)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-300"
          required
        />
        <input
          type="text"
          placeholder="Adresse"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-300"
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-300"
          required
        />
        <input
          type="number"
          placeholder="Superficie (m²)"
          value={superficie}
          onChange={(e) => setSuperficie(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-300"
          required
        />
        <input
          type="text"
          placeholder="Nom du propriétaire"
          value={proprietaire}
          onChange={(e) => setProprietaire(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-300"
          required
        />
        {/* <input
          type="text"
          placeholder="URL de l’image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-300"
        /> */}
        <textarea
          placeholder="Description du bien"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="md:col-span-3 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-300"
          rows={3}
        />
        <div className="md:col-span-3 flex justify-between items-center">
  {/* Bouton retour à gauche */}
  <button
    onClick={handleBack}
    className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-gray-400 transition text-sm"
  >
    <ArrowLeft className="w-4 h-4" />
    Retour
  </button>

  {/* Bouton ajouter/modifier à droite */}
  <button
    type="submit"
    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
  >
    <Home className="w-4 h-4" />
    {editingId ? "Modifier" : "Ajouter"}
  </button>
</div>

      </form>

      {/* Liste des propriétés */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FF9800] ">
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
            {proprietes.length > 0 ? (
              proprietes.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 border">{p.titre}</td>
                  <td className="p-3 border">{p.type}</td>
                  <td className="p-3 border">{p.adresse}</td>
                  <td className="p-3 border">{p.prix.toLocaleString()} FCFA</td>
                  <td className="p-3 border">{p.superficie} m²</td>
                  <td className="p-3 border">{p.proprietaire}</td>
                  <td className="p-3 border text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                        onClick={() => editPropriete(p)}
                      >
                        Modifier
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                        onClick={() => deletePropriete(p.id, p.titre)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  Aucune propriété disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProprietes;

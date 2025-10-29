import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  FileText,
  ArrowLeft,
  Edit,
  Trash2,
  Download,
  Search,
} from "lucide-react";

interface Client {
  id: number;
  nom: string;
  prenom?: string;
  email?: string;
  telephone?: string;
}

interface Propriete {
  id: number;
  titre: string;
  type: string;
  adresse?: string;
}

interface Contrat {
  id?: number;
  clientId: number;
  proprieteId: number;
  typeContrat: string;
  dateDebut: string;
  dateFin: string;
  montant: number;
  description: string;
}

const Contrats: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [proprietes, setProprietes] = useState<Propriete[]>([]);
  const [contrats, setContrats] = useState<Contrat[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // États du formulaire
  const [clientId, setClientId] = useState<number | "">("");
  const [proprieteId, setProprieteId] = useState<number | "">("");
  const [typeContrat, setTypeContrat] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [montant, setMontant] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const API_URL = "http://localhost:3000";

  const fetchData = async () => {
    const [resClients, resProprietes, resContrats] = await Promise.all([
      fetch(`${API_URL}/clients`),
      fetch(`${API_URL}/proprietes`),
      fetch(`${API_URL}/contrats`),
    ]);

    setClients(await resClients.json());
    setProprietes(await resProprietes.json());
    setContrats(await resContrats.json());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const contratData: Contrat = {
      clientId: Number(clientId),
      proprieteId: Number(proprieteId),
      typeContrat,
      dateDebut,
      dateFin,
      montant: Number(montant),
      description,
    };

    if (!editingId) contratData.id = Math.floor(1000 + Math.random() * 9000);

    try {
      if (editingId) {
        await fetch(`${API_URL}/contrats/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contratData),
        });
        Swal.fire("Modifié ✅", "Contrat mis à jour avec succès", "success");
      } else {
        await fetch(`${API_URL}/contrats`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contratData),
        });
        Swal.fire("Ajouté ✅", "Nouveau contrat ajouté", "success");
      }

      resetForm();
      setShowModal(false);
      fetchData();
    } catch {
      Swal.fire("Erreur", "Une erreur est survenue", "error");
    }
  };

  const resetForm = () => {
    setClientId("");
    setProprieteId("");
    setTypeContrat("");
    setDateDebut("");
    setDateFin("");
    setMontant("");
    setDescription("");
    setEditingId(null);
  };

  const deleteContrat = async (id: number) => {
    Swal.fire({
      title: "Supprimer ce contrat ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`${API_URL}/contrats/${id}`, { method: "DELETE" });
        Swal.fire("Supprimé ✅", "Contrat supprimé avec succès", "success");
        fetchData();
      }
    });
  };

  const editContrat = (contrat: Contrat) => {
    setEditingId(contrat.id || null);
    setClientId(contrat.clientId);
    setProprieteId(contrat.proprieteId);
    setTypeContrat(contrat.typeContrat);
    setDateDebut(contrat.dateDebut);
    setDateFin(contrat.dateFin);
    setMontant(String(contrat.montant));
    setDescription(contrat.description);
    setShowModal(true);
  };

  const downloadContrat = (contrat: Contrat) => {
    const client =
      clients.find((cl) => Number(cl.id) === contrat.clientId)?.nom ||
      "Client inconnu";
    const propriete =
      proprietes.find((p) => Number(p.id) === contrat.proprieteId)?.titre ||
      "Propriété inconnue";

    const contratTxt = `
      Contrat ID: ${contrat.id}
      Client: ${client}
      Propriété: ${propriete}
      Type de contrat: ${contrat.typeContrat}
      Date début: ${contrat.dateDebut}
      Date fin: ${contrat.dateFin}
      Montant: ${contrat.montant} FCFA
      Description: ${contrat.description}
    `;

    const blob = new Blob([contratTxt], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `contrat_${contrat.id}.txt`;
    link.click();
  };

  const handleBack = () => window.history.back();

  // ====== Recherche ======
  const filteredContrats = contrats.filter((c) => {
    const client = clients.find((cl) => cl.id === c.clientId);
    const propriete = proprietes.find((p) => p.id === c.proprieteId);
    const search = searchTerm.toLowerCase();

    return (
      client?.nom.toLowerCase().includes(search) ||
      client?.prenom?.toLowerCase().includes(search) ||
      propriete?.titre.toLowerCase().includes(search) ||
      c.typeContrat.toLowerCase().includes(search)
    );
  });

  return (
    
    <div className="p-8 border-2 border-[#FED9B7] bg-gray-200 rounded-2xl shadow-lg max-w-7xl mx-auto mt-10">
      {/* ====== HEADER ====== */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2  bg-[#14204D] text-[#FED9B7] px-3 py-2 rounded-lg hover:bg-gray-700 transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
       
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-[#14204D] text-[#FED9B7] px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm"
        >
           <FileText className="w-4 h-4" />  Nouveau Contrat
        </button>
      </div>

      {/* ====== BARRE DE RECHERCHE ====== */}
      <div className="flex  border-2 border-[#FED9B7] items-center mb-6  rounded-full overflow-hidden max-w-md ">
        <Search className="w-5 h-5 text-gray-500 ml-2" />
        <input
          type="text"
          placeholder="Rechercher un contrat..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full outline-none  "
        />
      </div>

      {/* ====== TABLEAU ====== */}
      <div className="overflow-x-auto">
        <table className="min-w-full border  border-gray-200 rounded-lg overflow-hidden">
          <thead className=" bg-[#FED9B7] text-[#14204D]">
            <tr>
              <th className="border p-3">ID</th>
              <th className="border p-3">Client</th>
              <th className="border p-3">Propriété</th>
              <th className="border p-3">Type</th>
              <th className="border p-3">Période</th>
              <th className="border p-3">Montant</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContrats.length > 0 ? (
              filteredContrats.map((c) => {
                const client = clients.find((cl) => Number(cl.id) === c.clientId);
                const propriete = proprietes.find(
                  (p) => Number(p.id) === c.proprieteId
                );

                return (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="border p-3">{c.id}</td>
                    <td className="border p-3">
                      {client ? (
                        <>
                          {client.nom} {client.prenom}
                          <br />
                          <span className="text-gray-500 text-xs">
                            {client.email}
                          </span>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="border p-3">
                      {propriete ? propriete.titre : "—"}
                      <br />
                      <span className="text-gray-500 text-xs">
                        {propriete?.adresse}
                      </span>
                    </td>
                    <td className="border p-3">{c.typeContrat}</td>
                    <td className="border p-3">
                      {c.dateDebut} → {c.dateFin}
                    </td>
                    <td className="border p-3">
                      {c.montant.toLocaleString()} FCFA
                    </td>
                    <td className="border p-3 flex gap-2 justify-center">
                      <button
                        onClick={() => editContrat(c)}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteContrat(c.id!)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => downloadContrat(c)}
                        className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-4 text-gray-500">
                  Aucun contrat trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ====== MODAL AJOUT / MODIF ====== */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-200 rounded-xl p-6 w-full max-w-2xl shadow-lg border-2 border-[#FED9B7]">
            <h2 className="text-xl font-bold mb-4 text-[#14204D] flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {editingId ? "Modifier le contrat" : "Ajouter un contrat"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <select
                value={clientId}
                onChange={(e) => setClientId(Number(e.target.value))}
                className="border border-gray-300 p-3 rounded-lg"
                required
              >
                <option value="">-- Sélectionner un client --</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nom} {c.prenom ?? ""} — {c.email ?? "Aucun email"}
                  </option>
                ))}
              </select>

              <select
                value={proprieteId}
                onChange={(e) => setProprieteId(Number(e.target.value))}
                className="border border-gray-300 p-3 rounded-lg"
                required
              >
                <option value="">-- Sélectionner une propriété --</option>
                {proprietes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.titre} ({p.type})
                  </option>
                ))}
              </select>

              <select
                value={typeContrat}
                onChange={(e) => setTypeContrat(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg"
                required
              >
                <option value="">-- Type de contrat --</option>
                <option value="Location">Location</option>
                <option value="Vente">Vente</option>
              </select>

              <input
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg"
                required
              />
              <input
                type="date"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg"
                required
              />
              <input
                type="number"
                placeholder="Montant"
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg"
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg md:col-span-2"
              ></textarea>

              <div className="md:col-span-2 flex justify-between items-center mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-[#FED9B7] text-[#14204D] px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  {editingId ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
   
  );
};

export default Contrats;

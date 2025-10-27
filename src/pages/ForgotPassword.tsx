import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Email de récupération envoyé à ${email}`);
    // Optionnel : rediriger automatiquement vers login
    // navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md relative">

        {/* Bouton de retour en haut à gauche */}
        <button
          onClick={() => navigate("/login")}
          className="absolute  top-4 left-4 flex items-center gap-2 text-green-600 hover:text-gar-600 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Retour</span>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Mot de passe oublié
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <button
            type="submit"
            className="w-full bg-green-800 text-white p-3 rounded-lg hover:bg-gray-500 transition"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Lock, Mail ,Building2} from "lucide-react";
import immobilierPh from "../assets/immo.png";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // on simule une inscription réussie
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    // 🔹 Ici tu peux appeler ton API pour enregistrer le compte
    // await fetch(`${API_URL}/register`, { method: "POST", body: JSON.stringify({ username, email, password }) })

    login(username);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="flex flex-col md:flex-row bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full">

        {/* Image côté gauche */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={immobilierPh}
            alt="Immeuble moderne"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Formulaire côté droit */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
         <Link
          to="/"
          aria-label="Accueil"
          className="flex justify-between items-start pt-14 pl-0 ml-0" // le logo reste à gauche sans marge
        >
          <Building2 className="w-10 h-10 text-[#14204D]" /> {/* logo plus grand */}
        </Link>
          <h2 className="text-3xl font-bold mb-6 text-center text-[#FED9B7]">
            Créer un compte
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Nom d'utilisateur */}
            <div className="flex items-center border rounded-lg p-4 focus-within:ring-2 focus-within:ring-orange-900">
              <User className="text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-lg focus:outline-none bg-transparent"
              />
            </div>

            {/* Email */}
            <div className="flex items-center border rounded-lg p-4 focus-within:ring-2 focus-within:ring-orange-900">
              <Mail className="text-gray-500 mr-3" />
              <input
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-lg focus:outline-none bg-transparent"
              />
            </div>

            {/* Mot de passe */}
            <div className="flex items-center border rounded-lg p-4 focus-within:ring-2 focus-within:ring-orange-900">
              <Lock className="text-gray-500 mr-3" />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-lg focus:outline-none bg-transparent"
              />
            </div>

            {/* Bouton inscription */}
            <button
              type="submit"
              className="w-full bg-[#FED9B7] text-white p-4 rounded-lg hover:bg-[#14204D] transition font-semibold text-lg"
            >
              S'inscrire
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Déjà un compte ?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

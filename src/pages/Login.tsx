import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock, User, AlertCircle,Building2 } from "lucide-react";
import immobilierImg from "../assets/img.png";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const API_URL = "http://localhost:3000/users";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Veuillez remplir tous les champs !");
      return;
    }

    try {
      const res = await fetch(`${API_URL}?username=${username}`);
      const users = await res.json();

      if (users.length === 0) {
        setError("Ce compte n'existe pas. Veuillez vous inscrire.");
        return;
      }

      const user = users[0];
      if (user.password === password) {
        login(username);
        if (remember) {
          localStorage.setItem("rememberUser", username);
        } else {
          localStorage.removeItem("rememberUser");
        }
        navigate("/admin");
      } else {
        setError("Mot de passe incorrect !");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setError("Erreur serveur. Réessayez plus tard.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="flex flex-col md:flex-row bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden max-w-5xl">
        {/* Image gauche */}
        <div className="hidden md:block w-1/2">
          <img
            src={immobilierImg}
            alt="Immeuble moderne"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Formulaire droit */}
        <div className="w-full md:w-1/2 p-10 md:p-24 flex flex-col justify-center bg-gray-100">
       <Link
  to="/"
  aria-label="Accueil"
  className="flex justify-between items-start pt-14 pl-0 ml-0" // le logo reste à gauche sans marge
>
  <Building2 className="w-10 h-10 text-[#14204D]" /> {/* logo plus grand */}
</Link>


          <h2 className="text-3xl font-bold mb-6  text-center text-[#FED9B7] ">
            
            Connexion
          </h2>

          {error && (
            <div className="flex items-center gap-2 bg-red-100 text-red-600 border border-red-300 rounded-md p-3 mb-4">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom d’utilisateur */}
            <div className="flex items-center border rounded-lg p-4 focus-within:ring-2 focus-within:ring-orange-900 w-full">
              <User className="text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-lg focus:outline-none bg-transparent"
              />
            </div>

            {/* Mot de passe */}
            <div className="flex items-center border rounded-lg p-4 focus-within:ring-2 focus-within:ring-orange-900 w-full">
              <Lock className="text-gray-500 mr-3" />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-lg focus:outline-none bg-transparent"
              />
            </div>

            {/* Options bas du formulaire */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-green-600"
                />
                Se souvenir de moi
              </label>
              <Link
                to="/forgot-password"
                className="text-indigo-600 hover:underline font-medium"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Bouton connexion */}
            <button
              type="submit"
              className="w-full bg-[#FED9B7] text-white p-4 rounded-lg hover:bg-[#14204D] transition font-semibold text-lg"
            >
              Se connecter
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Pas encore de compte ?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:underline font-medium"
            >
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

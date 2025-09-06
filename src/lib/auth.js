import { getAuth } from "firebase/auth";
import { app } from "./firebase"; // Le chemin est correct si vous êtes dans le même dossier

const auth = getAuth(app);

export { auth };
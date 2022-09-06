import { createContext } from "react"
import { UserContextType } from "./@types/decs";

export const UserContext = createContext<UserContextType | null>(null);
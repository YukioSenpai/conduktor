import { useDispatch } from "react-redux";
import { store } from "../store/store";

export const useSafeDispatch: () => typeof store['dispatch'] = useDispatch
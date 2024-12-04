import { createContext } from "preact";
import PlaneResult, { PlaneParams } from "../types/PlaneResult";
import VecList from "../types/VecList";

type MainData = undefined;
type ProcessingData = VecList;
type ErrorData = string;
type SuccessData = { list: VecList, result: PlaneResult, params: PlaneParams };

type StateType = "main" | "processing" | "error" | "success";
type DataType = MainData | ProcessingData | ErrorData | SuccessData;

type StateContextValue = {
    state: StateType;
    setState: (state: StateType) => void;
    data: DataType;
    setData?: (data: DataType) => void;
    fileName?: string;
    setFileName?: (fileName: string) => void;
}

const StateContext = createContext<StateContextValue | undefined>(undefined);

export { StateContext, StateType, StateContextValue, DataType, MainData, ProcessingData, ErrorData, SuccessData };
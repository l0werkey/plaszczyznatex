import Vec3 from "../types/Vec3";
import VecList from "../types/VecList";

type Result = "success" | "incorrect format" | "error";

type VecEntry = {
    id: number;
    vec: Vec3;
};

type ParsedData = {
    vecs?: VecEntry[];
    result: Result;
};

type LoadingResult = {
    list?: VecList;
    result: Result;
};

const numbersToVecEntries = (numbers: number[][]): VecEntry[] => 
    numbers.map(([id, ...vec]) => ({ id, vec: vec as Vec3 }));

const parse = (input: string): ParsedData => {
    const lines = input.split("\n");

    if (lines.length < 2) return { result: "incorrect format" };

    // Split each line into parts and filter out empty lines or lines with only spaces
    const data = lines
        .map(line => line.split(" "))
        .filter(vec => vec.length > 0 && vec[0].trim() !== "");

    let numberData: number[][];
    try {
        // Attempt to convert the split data into numbers
        numberData = data.map(vec => vec.map(parseFloat));
    } catch {
        return { result: "incorrect format" };
    }

    // Check if every vector has exactly 4 elements
    if (!numberData.every(vec => vec.length === 4)) return { result: "incorrect format" };

    return { vecs: numbersToVecEntries(numberData), result: "success" };
};

export default function loadVecList(input: string): LoadingResult {
    const { vecs, result } = parse(input);

    if (result !== "success") return { result };

    // Create a dictionary to store vectors by their id
    const vecDict = vecs.reduce((dict, { id, vec }) => {
        dict[id] = vec;
        return dict;
    }, {} as { [id: number]: Vec3 });

    const finalVecs = Object.values(vecDict);

    return { 
        list: { vecs: finalVecs, length: finalVecs.length, total: vecs.length }, 
        result 
    };
}

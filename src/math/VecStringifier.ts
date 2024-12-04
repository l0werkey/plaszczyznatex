import Vec3 from "src/types/Vec3";

export default function stringinfyVec3(vecs: Vec3[]): string {
    return vecs.map((v, idx) => `${idx+1} ${v[0]} ${v[1]} ${v[2]}`).join("\n");
}
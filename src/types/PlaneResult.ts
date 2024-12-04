import Vec3 from "./Vec3"

type PlaneResult = {
    vertices: [Vec3, Vec3, Vec3, Vec3]
}

type PlaneParams = [number, number, number];

export default PlaneResult;
export { PlaneParams };
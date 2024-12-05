import Vec3 from "../types/Vec3";
import VecList from "../types/VecList";
import PlaneResult, { PlaneParams } from "../types/PlaneResult";
import { Decimal } from 'decimal.js';
import { matrix, multiply, inv, transpose } from 'mathjs';

function vecToParamOutput(vec: Vec3): [[number, number], number] {
    return [[vec[0], vec[1]], vec[2]];
}

function verticesFromParams([slopeX, slopeY, intercept]: PlaneParams, xRange: number[], yRange: number[]): Vec3[] {
    const corners: Vec3[] = [];

    corners.push([xRange[0], yRange[0], slopeX * xRange[0] + slopeY * yRange[0] + intercept]); // Corner 1: (min_x, min_y)
    corners.push([xRange[0], yRange[1], slopeX * xRange[0] + slopeY * yRange[1] + intercept]); // Corner 2: (min_x, max_y)
    corners.push([xRange[1], yRange[0], slopeX * xRange[1] + slopeY * yRange[0] + intercept]); // Corner 3: (max_x, min_y)
    corners.push([xRange[1], yRange[1], slopeX * xRange[1] + slopeY * yRange[1] + intercept]); // Corner 4: (max_x, max_y)

    return corners;
}

export default class PlaneSolver {
    private vecs: Vec3[];
    private planeResult?: PlaneResult;
    private planeParams?: PlaneParams;
    private running: boolean = false;

    constructor(vecs: VecList) {
        this.vecs = vecs.vecs;
    }

    public solve(): PlaneSolver {
        this.running = true;

        console.log(this.vecs)

        // Convert data to high-precision using Decimal.js
        const paramsOutputs = this.vecs.map(vecToParamOutput);
        const xs = paramsOutputs.map(([coords]) => coords.map((val) => new Decimal(val))); // [[x, y], ...]
        const zs = paramsOutputs.map(([, z]) => new Decimal(z)); // [z, ...]

        // Construct the matrix for normal equations
        const A = matrix(xs.map(([x, y]) => [x, y, new Decimal(1)])); // Design matrix
        const Z = matrix(zs.map((z) => [z])); // Target vector

        // Solve the normal equations (A^T * A) * params = A^T * Z
        const AT = transpose(A);
        const ATA = multiply(AT, A); // A^T * A
        const ATZ = multiply(AT, Z); // A^T * Z

        const ATA_inv = inv(ATA); // (A^T * A)^-1
        const params = multiply(ATA_inv, ATZ); // params = (A^T * A)^-1 * A^T * Z

        const paramsArray = (params as any).toArray();
        this.planeParams = [
            paramsArray[0][0].toNumber(), // SlopeX
            paramsArray[1][0].toNumber(), // SlopeY
            paramsArray[2][0].toNumber(), // Intercept
        ] as PlaneParams;

        // Determine the range of x and y for creating the plane vertices
        const xRange = [Math.min(...this.vecs.map((v) => v[0])), Math.max(...this.vecs.map((v) => v[0]))];
        const yRange = [Math.min(...this.vecs.map((v) => v[1])), Math.max(...this.vecs.map((v) => v[1]))];

        this.planeResult = {
            vertices: verticesFromParams(this.planeParams, xRange, yRange) as [Vec3, Vec3, Vec3, Vec3],
        };

        this.running = false;
        return this;
    }

    public done(): boolean {
        return !this.running;
    }

    public result(): PlaneResult {
        if (!this.planeResult) throw new Error('Solve the plane first!');
        return this.planeResult;
    }

    public params(): PlaneParams {
        if (!this.planeParams) throw new Error('Solve the plane first!');
        return this.planeParams;
    }
}

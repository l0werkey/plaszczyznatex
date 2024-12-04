import { useContext, useEffect, useState } from "preact/hooks";
import { StateContext } from "../StateContext";
import PlaneSolver from "../../math/VecsToPlane";
import VecList from "../../types/VecList";
import styles from "./styles.css";

export default function ProcessingState() {
    const context = useContext(StateContext);

    useEffect(() => {
        if (!context.data) return;

        const task = async () => {
            const solver = new PlaneSolver(context.data as VecList);
            const result = solver.solve().result();
            const params = solver.params();

            context.setData({
                list: context.data as VecList,
                result: result,
                params: params
            });

            context.setState("success");
        }
        task();
    }, [context.data]);

    return <div>
        <h1>Regresuję...</h1>
    </div>;
}
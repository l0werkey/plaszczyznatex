import { useContext, useEffect, useState } from "preact/hooks";
import { StateContext, SuccessData } from "../StateContext";
import Graph3D from "../math/Graph3d";
import { Capacitor } from '@capacitor/core';
import { FancyButton } from "../widgets/FancyButton";
import stringinfyVec3 from "../../math/VecStringifier";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

function SaveSection() {
    const context = useContext(StateContext);

    let fileParts = context.fileName.split(".");
    fileParts[0] += "-plaszczyzna";
    const saveName = fileParts.join(".");

    const data = context.data as SuccessData;
    const textContent = stringinfyVec3(data.result.vertices);

    function showSaveDialog() {
        const blob = new Blob([textContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = saveName;
        link.click();
        URL.revokeObjectURL(url);
    }

    async function saveCapacitor() {
        const data = context.data as SuccessData;
        const textContent = stringinfyVec3(data.result.vertices);

        try {
            await Filesystem.writeFile({
                path: saveName,
                data: textContent,
                directory: Directory.Documents,
                encoding: Encoding.UTF8
            });
        } catch (e) {
            alert("Błąd podczas zapisywania pliku");
            alert(e.message);
        }
    }

    useEffect(() => {
        if (Capacitor.isNativePlatform()) {
            saveCapacitor();
        }
    }, []);

    if (Capacitor.isNativePlatform()) {
        return <div>
            <p>Wynik zapisano w dokumentach jako "{saveName}"</p>
        </div>
    } else {
        return <div>
            <FancyButton onClick={showSaveDialog}>Zapisz wyniki</FancyButton>
        </div>;
    }
}

export default function SuccessState() {
    const context = useContext(StateContext);

    // const data = context.data as SuccessData;

    return <div style={{ display: "grid", "placeItems": "center" }}>
        <h1>Sukces!</h1>
        {/* <Graph3D points={data.list.vecs} size={256} /> */}
        <SaveSection />
        <FancyButton onClick={() => context.setState("main")}>Powróć</FancyButton>
    </div>;
}
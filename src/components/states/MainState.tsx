import { h } from 'preact';
import Logo from '../widgets/Logo';
import { FancyButton } from '../widgets/FancyButton';
import { useContext, useRef, useState } from 'preact/hooks';
import loadVecList from '../../math/VecListReader';
import { StateContext } from '../StateContext';

import styles from './styles.css';
import { Capacitor } from '@capacitor/core';

export default function MainState() {
    const fileInputRef = useRef(null);
	const [pickingFile, setPickingFile] = useState(false);

    const context = useContext(StateContext);

	const handleFileSelection = async (event) => {
		const file = event.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = async (e) => {
				const fileContent = e.target.result;
				if (fileContent) {
					const { list, result } = loadVecList(fileContent as string);

                    if (result !== "success") {
                        switch (result) {
                            case "error":
                                alert("Błąd podczas wczytywania pliku");
                                filePickerFinished();
                                break;
                            case "incorrect format":
                                alert("Nieprawidłowy format pliku");
                                filePickerFinished();
                                break;
                        }
                        return;
                    }

                    context.setData(list);
                    context.setState("processing");
                    context.setFileName(file.name);
                    return;
				}
			};

			reader.onerror = (e) => {
                alert("Błąd podczas wczytywania pliku");
                filePickerFinished();
			};

			reader.readAsText(file);
		}

        event.target.value = '';
	};

	const filePickerFinished = () => {
		setPickingFile(false);
	}

	const openFilePicker = () => {
		fileInputRef.current.click();
        if(!Capacitor.isNativePlatform())
		    setPickingFile(true);
	};

    return (
        <>
            <h1 class={styles.title}><Logo size={64} /> Płaszczyznatex</h1>
            <FancyButton onClick={openFilePicker} disabled={pickingFile}> Rozpocznij </FancyButton>
            <input
                ref={fileInputRef}
                type="file"
                accept={'.txt'}
                style={{ display: 'none' }}
                onChange={handleFileSelection}
                onCancel={filePickerFinished} />
        </>
    );
}
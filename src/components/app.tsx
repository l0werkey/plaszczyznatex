import { useContext, useRef, useState } from 'preact/hooks';
import { DataType, StateContext, StateContextValue, StateType } from './StateContext';
import MainState from './states/MainState';
import ProcessingState from './states/ProcessingState';
import SuccessState from './states/SuccessState';

const StateSelector = () => {
	const context = useContext(StateContext);

	switch (context.state) {
		case "main":
			return <MainState />;
		case "processing":
			return <ProcessingState />;
		case "success":
			return <SuccessState />
	}
}

const App = () => {
	const [state, setState] = useState<StateType>("main");
    const [data, setData] = useState<DataType>(undefined);
	const [fileName, setFileName] = useState<string>("");

    const value: StateContextValue = {
        state,
        setState: (state) => {
            setState(state);
        },
        data,
        setData: (data) => {
            setData(data);
        },
    		fileName,
    		setFileName: (fileName) => {
   			setFileName(fileName);
    		}
    };
	
	return <div id="app">
		{/* @ts-ignore */}
		<StateContext.Provider value={value}>
			<div class="centerContainer">
				<StateSelector />
			</div>
		</StateContext.Provider>
	</div>
};

export default App;

import React, { useState } from 'react';
import './App.scss';
import Research from './Research/Research';
import Result from './Result/Result';


function App()
{
	const [finalInput, setFinalInput] = useState('');
	const [finalSelect, setFinalSelect] = useState('');
	const [reset, setReset] = useState(false);

	return (
		<main>
			<Research
				setters={
					{
						"setFinalInput":setFinalInput,
						"setFinalSelect":setFinalSelect,
						"setReset":setReset
					}
				}
			/>
			<Result
				getters={
					{
						"input": finalInput,
						"select": finalSelect,
						"reset": reset
					}
				}
				setters={
					{
						"setReset":setReset
					}
				}
			/>
		</main>
	);
}

export default App;

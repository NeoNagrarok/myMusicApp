import React, { useState } from 'react';
import Research from './Research/Research';
import Result from './Result/Result';
import './Main.scss';


function Main({match})
{
	const [reset, setReset] = useState(true);
	const [limit, setLimit] = useState(25);
	
	const resetLimit = limit =>
	{
		setReset(true);
		setLimit(limit);
	}

	const {select = '', input = ''} = match.params;

	return (
		<main>
			<h1>My Muuuuuusic AAAPP !</h1>
			<Research
				getters={
					{
						"inputValue": input,
						"selectValue": select
					}
				}
				setters={
					{
						"setReset":setReset
					}
				}
			/>
			<Result
				getters={
					{
						"input": input,
						"select": select,
						"reset": reset,
						"limit": limit
					}
				}
				setters={
					{
						"setReset": setReset,
						"setLimit": resetLimit
					}
				}
			/>
		</main>
	);
}

export default Main;

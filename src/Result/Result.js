import React, { useState, useEffect } from 'react';
import * as api from '../api/api';
import Heads from './Heads/Heads';
import Line from './Line/Line';
import Loader from './Loader/Loader';

const Result = ({getters:{input, select, reset}, setters:{setReset}}) =>
{
	const [data, setData] = useState([]);
	const [limit, setLimit] = useState(25);
	const [fetchable, setFetchable] = useState(false);
	const [nbrResults, setNbrResults] = useState(0);
	
	useEffect(() => {
		if (input !== '' && select !== '' && !reset)
		{
			if (!data)
				api.getRecord(setData, data, setNbrResults, nbrResults, input, select);
			else if (nbrResults < data[0].count)
				setFetchable(true);
			else
				setFetchable(false);
		}
		else if (reset)
		{
			setData(null);
			setReset(false);
			setNbrResults(0);
			setFetchable(false);
		}
	}, [data, input, select, reset, setReset, limit, nbrResults]);
	
	if (input !== '' && select !== '')
	{
		if (!data)
			return (
				<p>
					Researching ...
				</p>
			);
		if (typeof data[0] !== 'undefined' && !data[0].count)
			return (
				<p>
					Nothing found for this research.
				</p>
			);
		const heads = [
			'#',
			'Artist',
			'Title',
			'Album',
			'Action'
		];
		return (
			<table>
				<Heads type='thead' heads={heads} />
				<tbody>
					{data.map((d, i) => d.recordings.map((m, j) =>
						<Line m={m} i={(i * limit) + j} key={m.id}/>
					))}
					{fetchable && <Loader
						data={data} 
						setData={setData}
						setNbrResults={setNbrResults}
						nbrResults={nbrResults}
						input={input}
						select={select}
					/>}
				</tbody>
				<Heads type='tfoot' heads={heads} />
			</table>
		);
	}
	return (
		<p>
			No research
		</p>
	);
}

export default Result;

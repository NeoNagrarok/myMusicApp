import React, { useState, useEffect } from 'react';
import * as api from '../api/api';
import Heads from './Heads/Heads';
import Line from './Line/Line';

const Result = ({getters:{input, select, reset}, setters:{setReset}}) =>
{
	const [data, setData] = useState(null);
	
	useEffect(() => {
		if (input !== '' && select !== '' && !reset)
		{
			if (!data)
				api.getRecord(setData, input, select);
		}
		else if (reset)
		{
			setData(null);
			setReset(false);
		}
	}, [data, input, select, reset, setReset]);
	
	if (input !== '' && select !== '')
	{
		if (!data)
			return (
				<p>
					Researching ...
				</p>
			);
		if (!data.count)
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
					{data.recordings.map((m, i) =>
						<Line m={m} i={i} key={m.id}/>
					)}
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

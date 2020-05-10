import React, { useState, useEffect } from 'react';
import Spinner from "react-svg-spinner";
import * as api from '../api/api';
import Heads from './Heads/Heads';
import Line from './Line/Line';
import Loader from './Loader/Loader';
import './Result.scss';

const Result = ({getters:{input, select, reset, limit}, setters:{setReset, setLimit}}) =>
{
	const [data, setData] = useState([]);
	const [fetchable, setFetchable] = useState(false);
	const [nbrResults, setNbrResults] = useState(0);
	const [totalResults, setTotalResults] = useState(0);
	const [localLimit, setLocalLimit] = useState(limit);
	
	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		if (input !== '' && select !== '' && !reset)
		{
			if (!data)
				api.getRecord(signal, setData, data, setNbrResults, nbrResults, input, select, limit);
			else if (data[0] && nbrResults < data[0].count)
				setFetchable(true);
			else
				setFetchable(false);
			if (data && data[0])
				setTotalResults(data[0].count);
		}
		else if (reset)
		{
			setData(null);
			setReset(false);
			setNbrResults(0);
			setFetchable(false);
			setTotalResults(0);
		}
		
		return () => {
			abortController.abort()
		}
		
	}, [data, input, select, reset, setReset, limit, nbrResults]);
	
	if (input !== '' && select !== '')
	{
		if (!data)
			return (
				<h2>
					Researching ...<br />
					<Spinner color="rgb(40, 53, 22)" size="64px" thickness={2}/>
				</h2>
			);
		if (typeof data[0] !== 'undefined' && !data[0].count)
			return (
				<h2>
					Nothing found for this research.
				</h2>
			);
		const heads = [
			'#',
			'Artist',
			'Title',
			'Album',
			<span className='screen-reader-text'>Action</span>
		];
		return (
			<table>
				<Heads
					type='thead'
					heads={heads}
					limit={limit}
					setLimit={setLimit}
					totalResults={totalResults}
					setLocalLimit={setLocalLimit}
					localLimit={localLimit}
				/>
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
						limit={limit}
						colSpan={heads.length}
					/>}
				</tbody>
				<Heads
					type='tfoot'
					heads={heads}
					limit={limit}
					setLimit={setLimit}
					totalResults={totalResults}
					setLocalLimit={setLocalLimit}
					localLimit={localLimit}
				/>
			</table>
		);
	}
	return (
		<h2>
			No research in progress
		</h2>
	);
}

export default Result;

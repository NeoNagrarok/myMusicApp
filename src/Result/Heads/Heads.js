import React, { useState } from 'react';
import './Heads.scss';

const Heads = ({type, heads, limit, setLimit, totalResults, setLocalLimit, localLimit}) =>
{
	const tr =
	<tr>
		{heads.map((m, i) =>
			<th key={i}>
				{m}
			</th>
		)}
	</tr>;
	const options =
		<tr>
			<th className='options' colSpan={heads.length}>
				<div>
					Total : {totalResults}
					<form onSubmit={e => {
						e.preventDefault();
						setLimit(localLimit);
					}}>
						<input
							type='range'
							max='100'
							min='5'
							value={localLimit}
							onChange={e => setLocalLimit(e.target.value)}
						/>
						<button type="submit">
							Query limit {localLimit}
						</button>
					</form>
				</div>
			</th>
		</tr>;
	if (type === 'thead')
		return (
			<thead className='HeadTop'>
				{options}
				{tr}
			</thead>
		);
	return (
	<tfoot className='HeadBottom'>
		{tr}
		{options}
	</tfoot>
	);
}

export default Heads;

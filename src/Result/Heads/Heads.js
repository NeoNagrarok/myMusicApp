import React from 'react';

const Heads = ({type, heads}) =>
{
	const tr =
	<tr>
		{heads.map((m, i) =>
			<th key={i}>
				{m}
			</th>
		)}
	</tr>;
	if (type === 'thead')
		return (
			<thead>
				{tr}
			</thead>
		);
	return (
	<tfoot>
		{tr}
	</tfoot>
	);
}

export default Heads;

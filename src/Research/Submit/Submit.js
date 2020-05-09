import React from 'react';

const Submit = () =>
{
	return (
		<label htmlFor="submit">
			<span className="screen-reader-text">
				Send your research with this button
			</span>
			<button
				name="submit"
				type="submit"
			>
				Submit
			</button>
		</label>
	);
}

export default Submit;

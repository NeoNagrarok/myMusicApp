import React from 'react';

const Input = ({setter, value}) =>
{
	const onChangeHandle = e => setter(e.target.value);

	return (
		<label htmlFor="research">
			<span className="screen-reader-text">
				Research field
			</span>
			<input
				id="research"
				type="text"
				name="research"
				value={value}
				onChange={onChangeHandle}
			/>
		</label>
	);
}

export default Input;

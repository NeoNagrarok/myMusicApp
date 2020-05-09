import React from 'react';

const Select = ({setter, value}) =>
{
	const onChangeHandle = e => setter(e.target.value);

	return (
		<label htmlFor="select">
			<span className="screen-reader-text">
				Choice of research field
			</span>
			<select
				id="select"
				name="select"
				value={value}
				onChange={onChangeHandle}
			>
				<option value="everything">Everything</option>
				<option value="artist">Artist</option>
				<option value="recording">Title</option>
				<option value="release">Album</option>
			</select>
		</label>
	);
}

export default Select;

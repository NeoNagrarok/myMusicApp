import React, { useState } from 'react';
import Input from './Input/Input';
import Select from './Select/Select';
import Submit from './Submit/Submit';

const Research = ({setters:{setFinalInput, setFinalSelect, setReset}}) =>
{
	const [input, setInput] = useState('');
	const [select, setSelect] = useState('everything');
	
	const handleSubmit = e =>
	{
		e.preventDefault();
		setFinalInput(input);
		setFinalSelect(select);
		setReset(true);
	}

	return (
		<form onSubmit={handleSubmit}>
			<Input setter={setInput} value={input} />
			<Select setter={setSelect} value={select} />
			<Submit />
		</form>
	);
}

export default Research;

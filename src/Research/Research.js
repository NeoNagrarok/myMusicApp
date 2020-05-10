import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Input from './Input/Input';
import Select from './Select/Select';
import Submit from './Submit/Submit';
import './Research.scss';

const Research = ({setters:{setReset}, getters:{inputValue, selectValue}}) =>
{
	const [input, setInput] = useState(inputValue || '');
	const [select, setSelect] = useState(selectValue || 'everything');
	
	const history = useHistory();
	
	const handleSubmit = e =>
	{
		e.preventDefault();
		setReset(true);
		history.push('/' + select + '/' + input);
	}

	return (
		<form className="ResearchForm" onSubmit={handleSubmit}>
			<Input setter={setInput} value={input} />
			<Select setter={setSelect} value={select} submit={handleSubmit} />
			<Submit />
		</form>
	);
}

export default Research;

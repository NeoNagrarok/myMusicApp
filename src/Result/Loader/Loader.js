import React, {useRef, useEffect, useState} from 'react';
import Spinner from "react-svg-spinner";
import * as api from '../../api/api';

const  useIntersect = (callback, args) =>
{
	const [node, setNode] = useState(null);
	
	const observer = useRef(null);
	
	useEffect(
		() => {
			const abortController = new AbortController();
			const signal = abortController.signal;
			if (observer.current) observer.current.disconnect();
			
			observer.current = new window.IntersectionObserver(
				([entry]) => {
					if (entry.intersectionRatio === 1)
						callback(signal, ...args);
				},
				{
					root: null,
					rootMargin: '0px',
					threshold: 1
				}
			);
			
			const {current: currentObserver} = observer;
			
			if (node) currentObserver.observe(node);
			
			return () => {
				currentObserver.disconnect();
				abortController.abort();
			}
		},
		[node, callback, args]
	);
	
	return setNode;
}

const Loader = ({setData, data, setNbrResults, nbrResults, input, select, limit, colSpan}) =>
{
	const ref = useIntersect(api.getRecord, [setData, data, setNbrResults, nbrResults, input, select, limit]);
	
	return (
		<tr ref={ref}>
			<td colSpan={colSpan}><Spinner color="rgb(40, 53, 22)" size="64px" thickness={4}/></td>
		</tr>
	);
}

export default Loader;

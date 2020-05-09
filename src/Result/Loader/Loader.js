import React, {useRef, useEffect, useState} from 'react';
import * as api from '../../api/api';

const  useIntersect = (callback) =>
{
	const [node, setNode] = useState(null);
	
	const observer = useRef(null);
	
	useEffect(
		() => {
			if (observer.current) observer.current.disconnect();
			
			observer.current = new window.IntersectionObserver(
				([entry]) => {
					if (entry.intersectionRatio === 1)
						callback();
				},
				{
					root: null,
					rootMargin: '0px',
					threshold: 1
				}
			);
			
			const {current: currentObserver} = observer;
			
			if (node) currentObserver.observe(node);
			
			return () => currentObserver.disconnect();
		},
		[node, callback]
	);
	
	return setNode;
}

const Loader = ({setData, data, setNbrResults, nbrResults, input, select}) =>
{
	const ref = useIntersect(() => api.getRecord(setData, data, setNbrResults, nbrResults, input, select));
	
	return (
		<tr ref={ref}>
			<td>Loader</td>
		</tr>
	);
}

export default Loader;

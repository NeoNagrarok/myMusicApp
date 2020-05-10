import React, { useState, useEffect } from 'react';
import Spinner from "react-svg-spinner";
import LazyLoadComponent from 'react-intersection-observer-lazy-load'
import * as api from '../../api/api';
import './Line.scss';

const Line = ({m, i}) =>
{
	const [showModal, setShowModal] = useState(false);
	const [listAlbum, setListAlbum] = useState([]);
	const [covertArts, setCoversArts] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const Modal = ({children, releases}) =>
	{
		const className = showModal ? '' : 'hide';
		
		return (
			<div className={className}>
				<div
					className={'ModalBackground ' + className}
					onClick={hideModal}
				>
				</div>
				<aside className={'Modal ' + className}>
					<button
						onClick={hideModal}
						className='close'
					>
						Close
					</button>
					{children}
				</aside>
			</div>
		);
	}
	
	const displayModal = () => {
		setShowModal(true);
		document.body.style.overflow = 'hidden';
	}
	const hideModal = () => {
		setShowModal(false);
		document.body.style.overflow = 'initial';
	}
	
	function msToTime(ms) {
		let milliseconds = parseInt((ms % 1000) / 100),
		seconds = Math.floor((ms / 1000) % 60),
		minutes = Math.floor((ms / (1000 * 60)) % 60),
		hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;

		return hours + "h " + minutes + "m " + seconds + "s and " + milliseconds + 'ms';
	}
	
	useEffect(() => {
//		const abortController = new AbortController();
//		const signal = abortController.signal;
		if (typeof m.releases !== 'undefined' && !listAlbum.length)
			m.releases.map((r, i) => {
				setListAlbum(listAlbum => [...listAlbum, r.title]);
				
//				api.getCovertArtArchive(signal, setIsFetching, setCoversArts, covertArts, r.id);
				api.getCovertArtArchive(setIsFetching, setCoversArts, covertArts, r.id);
				return r;
			});
//		return () => {
//			setTimeout(() => abortController.abort(), 2500)
//		}
	}, [m, m.releases, covertArts, listAlbum.length]);

	return (
		<tr>
			<td
				onClick={displayModal}
				title={'Click to see more details for ' + i + ' - ' + m.title + ' ;)'}
			>
				{i}
			</td>
			<td
				onClick={displayModal}
				title={'Click to see more details for ' + i + ' - ' + m.title + ' ;)'}
			>
				{m['artist-credit'][0].name}
			</td>
			<td
				onClick={displayModal}
				title={'Click to see more details for ' + i + ' - ' + m.title + ' ;)'}
			>
				{m.title}
			</td>
			<td
				onClick={displayModal}
				title={'Click to see more details for ' + i + ' - ' + m.title + ' ;)'}
			>
				{typeof m.releases !== 'undefined' ? m.releases[0].title : ''}
			</td>
			<td>
				<span className='screen-reader-text'>Click on the row to show more content</span>
				<Modal>
					<div className="content">
							<b>Artist</b>
						<br />
							{m['artist-credit'][0].name}
						<br />
							<b>Title</b>
						<br />
							{m.title}
						<br />
							<b>Album</b>
						<br />
							{typeof m.releases !== 'undefined' ? m.releases[0].title : ''}
						<br />
							<b>Length</b>
						<br />
							{msToTime(m.length)}
						<br />
							<b>Score</b>
						<br />
							{m.score}
						<br />
							<b>Albums</b>
						<br />
							{listAlbum !== [] ? listAlbum.map((m, i, arr) => {
							return typeof arr[i + 1] !== 'undefined' ? m + ', ' : m
						}) : 'Loading'}
						<br />
						{isFetching && <Spinner color="rgb(40, 53, 22)" size="64px" thickness={4}/>}
					</div>
					<div className='images'>
						{covertArts !== [] ? covertArts.map(
							c => c.images.map(
								i => {
									return (
										<LazyLoadComponent
											options={{threshold: [1]}}
											placeholder={<Spinner color="rgb(40, 53, 22)" size="45%" thickness={4}/>} key={i.id}
										>
											<div className='imgContainer'>
												<img src={i.image} alt={'image for ' + m.title} />
											</div>
										</LazyLoadComponent>
									);
								}
							)
						) : ''}
					</div>
				</Modal>
			</td>
		</tr>
	);
}

export default Line;

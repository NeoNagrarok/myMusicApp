import React, { useState, useEffect } from 'react';
import * as api from '../../api/api';
import './Line.scss';

const Line = ({m, i}) =>
{
	const [showModal, setShowModal] = useState(false);
	const [archives, setArchives] = useState([]);
	const [listAlbum, setListAlbum] = useState([]);
	const [covertArts, setCoversArts] = useState([]);

	const Modal = ({children, releases}) =>
	{
		const className = showModal ? 'Modal' : 'Modal hide';
		
		return (
			<aside className={className}>
				<button
					onClick={hideModal}
					className='close'
				>
					Close
				</button>
				{children}
			</aside>
		);
	}
	
	const displayModal = () => setShowModal(true);
	const hideModal = () => setShowModal(false);
	
	useEffect(() => {
		if (typeof m.releases !== 'undefined' && !archives.length)
			m.releases.map((r, i) => {
				setArchives(archives => [...archives, r.id]);
				setListAlbum(listAlbum => [...listAlbum, r.title]);
				
				api.getCovertArtArchive(setCoversArts, covertArts, r.id);
			});
	}, [archives, m, m.releases, covertArts]);

	return (
		<tr>
			<td>
				{i}
			</td>
			<td>
				{m['artist-credit'][0].name}
			</td>
			<td>
				{m.title}
			</td>
			<td>
				{typeof m.releases !== 'undefined' ? m.releases[0].title : ''}
			</td>
			<td>
				<button
					onClick={displayModal}
				>
					See more
				</button>
				<Modal>
					<div className="content">
						Artist : {m['artist-credit'][0].name}
						<br />
						Title : {m.title}
						<br />
						Album : {typeof m.releases !== 'undefined' ? m.releases[0].title : ''}
						<br />
						Length : {m.length}
						<br />
						Score : {m.score}
						<br />
						Albums : {listAlbum !== [] ? listAlbum.map((m, i, arr) => {
							return typeof arr[i + 1] !== 'undefined' ? m + ', ' : m
						}) : 'Loading'}
						<br />
						images
					</div>
					<div className='images'>
						{covertArts !== [] ? covertArts.map(
							c => c.images.map(
								i => {
									return (
										<div className='imgContainer'>
											<img src={i.image} />
										</div>
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

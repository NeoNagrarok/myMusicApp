export const getRecord = (callback, input, select, limit=25) =>
{
	const query = select === 'everything' ? 'artist:"' + input + '" OR release:"' + input + '" OR recording:"' + input + '"' : select + ':"' + input + '"';

//console.log('http://musicbrainz.org/ws/2/recording/?fmt=json&query=' + query + '&limit=' + limit);

	fetch('http://musicbrainz.org/ws/2/recording/?fmt=json&query=' + query + '&limit=' + limit, {
		method: 'GET'
	})
	.then(response => response.json())
	.then(json => {
		callback(json);
	});
}

export const getCovertArtArchive = (callback, oldValue, id) =>
{
	console.log('http://coverartarchive.org/release/' + id);

	fetch('http://coverartarchive.org/release/' + id, {
		method: 'GET'
	})
	.then(response => response.json())
	.then(json => {
		callback(oldValue => [...oldValue, json]);
	});
}

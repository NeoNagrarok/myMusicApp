export const getRecord = (signal, setData, data, setNbrResults, nbrResults, input, select, limit=25) =>
{
	const query = select === 'everything' ? 'artist:"' + input + '" OR release:"' + input + '" OR recording:"' + input + '"' : select + ':"' + input + '"';

//console.log('http://musicbrainz.org/ws/2/recording/?fmt=json&query=' + query + '&limit=' + limit);

	fetch('http://musicbrainz.org/ws/2/recording/?fmt=json&query=' + query + '&limit=' + limit + '&offset=' + nbrResults, {
		method: 'GET',
		signal: signal
	})
	.then(response => {
		if (response.status !== 200)
	        throw new Error("HTTP status " + response.status);
		return response.json()
	})
	.then(json => {
		setNbrResults(parseInt(nbrResults) + parseInt(limit));
		/* if data fetching seems don't work normally, may be it is because of !nbrResults in next if. If it is the case, delete if from the if. This expression is due to intersection observer which call this function before data change from null to first fetch result and replace the first result ... I play on asyncronous use of setState to solve it ... :P */
		if (!data && !nbrResults)
			setData(data => [json])
		else
			setData(data => [...data, json]);
	})
    .catch(err => {
        console.log(err);
    });
}

//export const getCovertArtArchive = (signal, setIsFetching, callback, oldValue, id) =>
export const getCovertArtArchive = (setIsFetching, callback, oldValue, id) =>
{
//	console.log('http://coverartarchive.org/release/' + id);
	setIsFetching(true);
	fetch('http://coverartarchive.org/release/' + id, {
		method: 'GET'
//		signal: signal
	})
	.then(response => {
		if (response.status !== 200)
	        throw new Error("HTTP status " + response.status + "\nThere is no cover art for id " + id);
		return response.json()
	})
	.then(json => {
		callback(oldValue => [...oldValue, json]);
		setIsFetching(false);
	})
    .catch(err => {
        console.log(err);
    });
}

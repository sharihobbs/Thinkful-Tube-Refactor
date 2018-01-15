const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function submitRequest() {
  $('.video-search-form').on('submit', function (event) {
    event.preventDefault();
    const inputTerm = $(event.currentTarget).find('.input'); 
    const query = inputTerm.val();
    inputTerm.val("");
    requestData(query, showResults);
    console.log('submitRequest ran');
  });
}

function requestData(searchTerm, callback) {
  const query = {
    q: searchTerm,
    part: 'snippet', 
    key: 'AIzaSyB3a2-Zky_RGF8S3Sfqp-CbGR5XWVthMcA',
  };
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
  console.log('requestData ran');
  console.log(query);
}  

function renderResult(video) {
return `
  <div>
    <a data-fancybox="gallery" href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank"><img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}"></a>
    <a class="channel" href="https://www.youtube.com/channel/${video.snippet.channelId}" target="_blank">More videos from this channel</a> 
  </div>
  `;
}  

function showResults(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.search-results').html(results);
  $('.results').removeClass('hidden');
  console.log('showResults ran');
  console.log(data);
}

$(submitRequest);
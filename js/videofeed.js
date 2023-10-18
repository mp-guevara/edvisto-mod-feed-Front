const apiKey = 'AIzaSyDJ1MSBS6OPFZT-wqd5n9tAXHOD0iFT6qU';
const maxResults = 9;
const searchInput = document.getElementById('search_input');

const randomSearchTerm = 'los planetas cuarto grado shorts';
const maxVideoDuration = 'short';

const videoGrid = document.querySelector('.video-grid');

fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${randomSearchTerm}&maxResults=${maxResults}&type=video`)
  .then(response => response.json())
  .then(data => {
    const videoItems = data.items || [];

    videoItems.forEach(item => {
      const videoId = item.id.videoId;
      const snippet = item.snippet || {};
      const thumbnailUrl = snippet.thumbnails?.high?.url || '';

      const videoContainer = document.createElement('div');
      videoContainer.className = 'video-container';

      const thumbnailImage = document.createElement('img');
      thumbnailImage.src = thumbnailUrl;
      thumbnailImage.alt = snippet.title || '';

      videoContainer.appendChild(thumbnailImage);

      videoGrid.appendChild(videoContainer);

      createYouTubePlayer(videoContainer, videoId);
    });
  })
  .catch(error => console.error('Error fetching data from YouTube API:', error));

function createYouTubePlayer(container, videoId) {

  const cardContainer = document.createElement('div');
  cardContainer.className = 'video-card';


  const playerIframe = document.createElement('iframe');
  playerIframe.src = `https://www.youtube.com/embed/${videoId}`;
  playerIframe.width = '100%';
  playerIframe.height = '100%';
  playerIframe.allowfullscreen = true;

  // Append the player iframe to the card container
  cardContainer.appendChild(playerIframe);

  // Append the card container to the video grid
  container.appendChild(cardContainer);

  // You can add additional styling or classes to the card container if needed
}






//CODE THAT WORKS
/* const maxResults = 9;
const randomSearchTerm = '4th grade shorts';
const maxVideoDuration = 'short';


const videoGrid = document.querySelector('.video-grid');

fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${randomSearchTerm}&maxResults=${maxResults}&type=video`)
  .then(response => response.json())
  .then(data => {
    const videoItems = data.items || [];

    videoItems.forEach(item => {
      const videoId = item.id.videoId;
      const snippet = item.snippet || {};
      const thumbnailUrl = snippet.thumbnails?.high?.url || '';

      const videoContainer = document.createElement('div');
      videoContainer.className = 'video-container';

      const thumbnailImage = document.createElement('img');
      thumbnailImage.src = thumbnailUrl;
      thumbnailImage.alt = snippet.title || '';

      videoContainer.appendChild(thumbnailImage);

      videoGrid.appendChild(videoContainer);

      createYouTubePlayer(videoContainer, videoId);
    });
  })
  .catch(error => console.error('Error fetching data from YouTube API:', error));

function createYouTubePlayer(container, videoId) {
  const player = new YT.Player(container, {
    videoId: videoId,
    width: 220,
    height: 380,
    playerVars: {
      autoplay: 0,
      controls: 1,
      mute: 0,
    },
  });
}
 */













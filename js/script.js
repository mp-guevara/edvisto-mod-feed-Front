//API DE YOUTUBE
const apiKey = 'AIzaSyDJ1MSBS6OPFZT-wqd5n9tAXHOD0iFT6qU';
const maxResults = 9;
const searchInput = document.getElementById('search_input');

const randomSearchTerm = 'los planetas niños cuarto grado shorts';
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

  cardContainer.appendChild(playerIframe);

  container.appendChild(cardContainer);

}



/* //DESPLEGABLE
let dropdownOpened = false
function collapseDropdown() {
    const dropdown = document.getElementById('dropdown')
    const collpaseButton = document.getElementById('collpase-button')
    dropdownOpened = !dropdownOpened
    console.log(dropdown)
    if (dropdownOpened) {
        dropdown.classList.remove('hide')
        collpaseButton.classList.add('fa-rotate-180')
    } else {
        dropdown.classList.add('hide')
        collpaseButton.classList.remove('fa-rotate-180')
    }
} */




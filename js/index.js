const urlProjects = 'http://127.0.0.1:3000/api/projects?course=QuintoA&emailStudents=some1@example.com';

 async function fetchStudentProjects() {
  try {
    const response = await fetch(urlProjects, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    const projectsContainer = document.getElementById('studentProjects');
    
    data.Projects.forEach((project) => {
     
      const projectTemplate = `
     <div class="wrapper">
            <button class="collapsible" type="button">
                <div class="coll-title">    
                    Proyecto:${project.name}
                    <div class="info">
                        <p>Fecha de inicio:${project.startDate} </p>
                        <p>Fecha de finalización:${project.finishDate} </p>
                    </div>
                </div>
                <img src="../assets/img/collapsible-arrow.svg" alt="flecha hacia abajo">
            </button>
            <div class="content">
                <p class="drop-text">¡Sigue adelante con tu proyecto!</p>
                <p class="d-text">¡Adelántate y cumple tu meta a tiempo!</p>
                <p class="text">Haz click en el botón para seguir trabajando </p>
                <a href="/busqueda.html">
                    <button type="button" aria-label="boton ir" class="go-btn">¡Vamos!<img
                            src="./assets/img/arrow-right.svg" alt="flecha hacia la derecha"></button>
                </a>
            </div>
        </div>
      `;
    
     
      projectsContainer.innerHTML += projectTemplate;
    });

    console.log('Projects rendered successfully.');

  } catch (error) {
    console.error('Error al cargar los proyectos', error);
  }
} 


const coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    const content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight =  "180px";
    } 
  });
}

fetchStudentProjects()


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
  .catch(error => {
    console.error('Error fetching data from YouTube API:', error);
    if (error.message.includes('403 Forbidden')) {
      alert('has alcanzado la cuota máxima de videos or día.');
    }
  });


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






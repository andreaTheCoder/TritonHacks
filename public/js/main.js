document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('createForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const title = document.getElementById('createImgTitle').value;
      const description = document.getElementById('createImgDescription').value;
      const src = document.getElementById('createImgSrc').value;
      server_request('/images', { title, description, src }, 'POST', function(response) {
          window.location.reload();
      });
  });

  document.getElementById('imagesList').addEventListener('click', function(e) {
      const figure = e.target.closest('figure');
      if (!figure) return; 
      const imgId = figure.getAttribute('data-img-id');

      if (e.target.classList.contains('modifyBtn')) {
          const title = prompt("Enter new title:", figure.querySelector("figcaption > p").textContent);
          const description = prompt("Enter new description:", figure.querySelectorAll("figcaption > p")[1].textContent);
          const src = prompt("Enter new image source", figure.querySelector("img").src);

          server_request(`/images/${imgId}`, { title, description, src }, 'PUT', function(response) {
              window.location.reload();
          });
      } else if (e.target.classList.contains('deleteBtn')) {
          server_request(`/images/${imgId}`, {}, 'DELETE', function(response) {
              window.location.reload();
          });
      }
  });
});

function server_request(url, data={}, verb='GET', callback) {
  return fetch(url, {
      credentials: 'same-origin',
      method: verb,
      headers: {'Content-Type': 'application/json'},
      body: verb !== 'GET' ? JSON.stringify(data) : null,
  })
  .then(response => response.json())
  .then(response => {
      if(callback) callback(response);
  })
  .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    // Cargar comentarios existentes
    loadComments();
    
    // Manejar el envío del formulario de comentarios
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const comment = document.getElementById('comment').value;
            
            if (name && email && comment) {
                addComment(name, email, comment);
                commentForm.reset();
            }
        });
    }
});

function loadComments() {
    const commentsList = document.getElementById('commentsList');
    if (!commentsList) return;
    
    // Intentar cargar comentarios desde localStorage
    let comments = JSON.parse(localStorage.getItem('guardianesVerdesComments')) || [];
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<p class="no-comments">Aún no hay comentarios. Sé el primero en comentar.</p>';
        return;
    }
    
    // Mostrar comentarios
    commentsList.innerHTML = '';
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        
        const commentDate = new Date(comment.date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        commentElement.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${comment.name}</span>
                <span class="comment-date">${commentDate}</span>
            </div>
            <div class="comment-content">
                <p>${comment.comment}</p>
            </div>
        `;
        
        commentsList.appendChild(commentElement);
    });
}

function addComment(name, email, commentText) {
    // Obtener comentarios existentes
    let comments = JSON.parse(localStorage.getItem('guardianesVerdesComments')) || [];
    
    // Crear nuevo comentario
    const newComment = {
        name: name,
        email: email,
        comment: commentText,
        date: new Date().toISOString()
    };
    
    // Agregar al principio del array
    comments.unshift(newComment);
    
    // Guardar en localStorage
    localStorage.setItem('guardianesVerdesComments', JSON.stringify(comments));
    
    // Recargar comentarios
    loadComments();
}
document.addEventListener('DOMContentLoaded', function() {
    const sidebarSearchInput = document.getElementById('sidebar-live-search');
    const sidebarSearchBtn = document.getElementById('sidebar-search-btn');
    const postContainer = document.querySelector('.post-container');
    
    if (sidebarSearchInput) {
        sidebarSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            filterPosts(searchTerm);
        });
        
        if (sidebarSearchBtn) {
            sidebarSearchBtn.addEventListener('click', function() {
                const searchTerm = sidebarSearchInput.value.trim();
                if (searchTerm) {
                    window.location.href = 'search.php?search=' + encodeURIComponent(searchTerm);
                }
            });
        }
        
        sidebarSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    window.location.href = 'search.php?search=' + encodeURIComponent(searchTerm);
                }
            }
        });
    }
    
    function filterPosts(searchTerm) {
        if (!postContainer) return;
        
        const postContents = postContainer.querySelectorAll('.post-content');
        
        let visibleCount = 0;
        
        postContents.forEach(function(post) {
            const title = post.querySelector('h3 a')?.textContent.toLowerCase() || '';
            const description = post.querySelector('.description')?.textContent.toLowerCase() || '';
            const categoryName = Array.from(post.querySelectorAll('.post-information a'))
                .map(a => a.textContent.toLowerCase()).join(' ') || '';
            const authorName = Array.from(post.querySelectorAll('.post-information a'))
                .map(a => a.textContent.toLowerCase()).join(' ') || '';
            
            if (searchTerm === '' || 
                title.includes(searchTerm) || 
                description.includes(searchTerm) || 
                categoryName.includes(searchTerm) || 
                authorName.includes(searchTerm)) {
                post.style.display = '';
                visibleCount++;
            } else {
                post.style.display = 'none';
            }
        });
        
        let noResultsMsg = postContainer.querySelector('.no-search-results');
        
        if (visibleCount === 0 && searchTerm !== '') {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-search-results';
                noResultsMsg.innerHTML = '<h2>No posts found matching your search.</h2>';
                noResultsMsg.style.margin = '20px 0';
                noResultsMsg.style.padding = '20px';
                noResultsMsg.style.textAlign = 'center';
                noResultsMsg.style.backgroundColor = '#f5f5f5';
                noResultsMsg.style.borderRadius = '4px';
                postContainer.appendChild(noResultsMsg);
            }
            noResultsMsg.style.display = 'block';
        } else if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }
});


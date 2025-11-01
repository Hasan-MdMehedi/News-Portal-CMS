document.addEventListener('DOMContentLoaded', function() {
    const categorySearchInput = document.getElementById('category-search');
    const categoryTable = document.getElementById('category-table');
    
    if (categorySearchInput && categoryTable) {
        categorySearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const tableRows = categoryTable.querySelectorAll('tbody tr');
            
            let visibleCount = 0;
            
            tableRows.forEach(function(row) {
                const categoryName = row.cells[1]?.textContent.toLowerCase() || '';
                const postCount = row.cells[2]?.textContent.toLowerCase() || '';
                
                if (categoryName.includes(searchTerm) || postCount.includes(searchTerm)) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });
            
            let noResultsMsg = categoryTable.parentElement.querySelector('.no-search-results');
            
            if (visibleCount === 0 && searchTerm !== '') {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.className = 'no-search-results alert alert-info';
                    noResultsMsg.textContent = 'No categories found matching your search.';
                    noResultsMsg.style.margin = '15px 0';
                    noResultsMsg.style.padding = '12px';
                    noResultsMsg.style.textAlign = 'center';
                    categoryTable.parentElement.appendChild(noResultsMsg);
                }
                noResultsMsg.style.display = 'block';
            } else if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        });
    }
});


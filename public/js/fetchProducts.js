document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.searchForm');
    const resultsFieldset = document.querySelector('.tuiMain');
    
    searchForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const productInput = document.querySelector('.productInput');
        const sortSelect = document.querySelector('.sortDirection');
        const response = await fetch(`/api/search?q=${encodeURIComponent(productInput.value)}&sort=${sortSelect.value}`);

        const products = await response.json();
        displayProducts(products);
    });
    
    function displayProducts(products) {
        const grid = document.createElement('div');
        grid.className = 'productGrid';
        
        products.forEach(product => {
            const card = document.createElement('fieldset');
            card.id = 'productCard';
            
            const productName = document.createElement('p');
            productName.className = 'productName';
            productName.textContent = product.title.length > 30 ? product.title.substring(0, 30) + '...' : product.title;
            card.appendChild(productName);
            
            const link = document.createElement('a');
            link.className = "productLink";
            link.href = product.redirectLink;
            link.target = '_blank';
            
            const img = document.createElement('img');
            img.className = "productImage";
            img.src = product.image;
            img.alt = product.title;

            img.onerror = function() {
                this.src = "https://static.salidzini.lv/images/noimage_180x180.gif";
            }

            link.appendChild(img);
            card.appendChild(link);
            
            const bottomInfo = document.createElement('div');
            bottomInfo.className = 'productBottom';
            
            const price = document.createElement('p');
            price.className = 'productPrice';
            price.textContent = `€${product.price.toFixed(2)}`;
            bottomInfo.appendChild(price);
            
            const seller = document.createElement('p');
            seller.className = 'productSeller';
            seller.textContent = product.seller || 'unknown';
            bottomInfo.appendChild(seller);
            
            card.appendChild(bottomInfo);
            grid.appendChild(card);
        });
        
        resultsFieldset.innerHTML = '<legend class="tuiLegend">results</legend>';
        resultsFieldset.appendChild(grid);
    }
});
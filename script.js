const productList = document.getElementById('products');
const reviewList = document.getElementById('reviews');

const productForm = document.getElementById('productForm');
const reviewForm = document.getElementById('reviewForm');
const productSelect = document.getElementById('productSelect');

// Загрузка всех продуктов
async function loadProducts() {
  const res = await fetch('/products');
  const products = await res.json();

  productList.innerHTML = '';
  productSelect.innerHTML = '<option value="">Select Product</option>';
  products.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p._id} | ${p.name} - $${p.price} (${p.category})`;
    productList.appendChild(li);

    const option = document.createElement('option');
    option.value = p._id;
    option.textContent = p.name;
    productSelect.appendChild(option);
  });
}

// Загрузка всех отзывов
async function loadReviews() {
  const res = await fetch('/reviews');
  const reviews = await res.json();

  reviewList.innerHTML = '';
  reviews.forEach(r => {
    const li = document.createElement('li');
    li.textContent = `Product: ${r.productId.name} | Rating: ${r.rating} | ${r.text}`;
    reviewList.appendChild(li);
  });
}

// Добавление продукта
productForm.addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = Number(document.getElementById('price').value);
  const category = document.getElementById('category').value;

  await fetch('/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price, category })
  });

  productForm.reset();
  loadProducts();
});

// Добавление отзыва
reviewForm.addEventListener('submit', async e => {
  e.preventDefault();
  const productId = productSelect.value;
  const text = document.getElementById('text').value;
  const rating = Number(document.getElementById('rating').value);

  if (!productId) return alert('Please select a product first!');

  await fetch('/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, text, rating })
  });

  reviewForm.reset();
  loadReviews();
});

// Инициализация
loadProducts();
loadReviews();

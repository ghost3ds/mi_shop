import { getData, postData, deleteData } from '../api';

export const addProduct = () => {
  const titleInput = document.getElementById('product-title');
  const nameInput = document.getElementById('product-name');
  const priceInput = document.getElementById('product-price');
  const imageInput = document.getElementById('product-image');
  const saveBtn = document.getElementById('product-add-btn');
  const select = document.getElementById('product-category');
  const container = document.getElementById('product-table');

  const productData = {
    title: '',
    name: '',
    price: 0,
    preview: '',
    category: 0,
  };

  const checkValue = () => {
    if (
      nameInput.value === '' ||
      imageInput.value === '' ||
      titleInput.value === '' ||
      Number(priceInput.value) === 0 ||
      select.value === 'default'
    ) {
      saveBtn.disabled = true;
    } else {
      saveBtn.disabled = false;
    }
  };

  const render = (data) => {
    container.innerHTML = '';

    data.forEach((item, index) => {
      container.insertAdjacentHTML(
        'beforeend',
        `<tr>
        <th scope="row">${index + 1}</th>
        <td>${item.title}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td class="text-end">
          <button type="button" class="btn btn-outline-danger btn-sm" data-product=${item.id}>удалить</button>
        </td>
      </tr>`,
      );
    });
  };

  const updateTable = () => {
    getData('/products').then((data) => {
      render(data);
    });
  };

  select.addEventListener('change', () => {
    productData.category = select.value;

    const url = select.value !== 'default' ? `/products?category=${select.value}` : `/products`;

    getData(url).then((data) => {
      render(data);
    });

    checkValue();
  });

  nameInput.addEventListener('input', () => {
    productData.title = nameInput.value;
    checkValue();
  });

  titleInput.addEventListener('input', () => {
    productData.name = titleInput.value;
    checkValue();
  });

  priceInput.addEventListener('input', () => {
    productData.price = Number(priceInput.value);
    checkValue();
  });

  imageInput.addEventListener('input', () => {
    const file = imageInput.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
      const reader = new FileReader();

      reader.onload = () => {
        productData.preview = reader.result;
      };

      reader.onerror = () => {
        productData.preview = '';
        imageInput.value = '';
      };

      reader.readAsDataURL(file);
    } else {
      imageInput.value = '';
    }
    checkValue();
  });

  saveBtn.addEventListener('click', () => {
    console.log(productData);
    postData('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      nameInput.value = '';
      titleInput.value = '';
      priceInput.value = '';
      imageInput.value = '';
      updateTable();
    });
  });

  container.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const id = event.target.dataset.product;

      deleteData(`/products/${id}`).then((data) => {
        updateTable();
      });
    }
  });

  updateTable();
  checkValue();
};

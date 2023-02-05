import { getData, postData, deleteData } from '../api';

export const addCategory = () => {
  const nameInput = document.getElementById('category-name');
  const imageInput = document.getElementById('category-image');
  const saveBtn = document.getElementById('category-add-btn');
  const container = document.getElementById('category-container');
  const select = document.getElementById('product-category');

  const categoryData = {
    name: '',
    preview: '',
  };

  const render = (data) => {
    container.innerHTML = '';

    data.forEach((item, index) => {
      container.insertAdjacentHTML(
        'beforeend',
        ` <tr>
        <th scope="row">${index + 1}</th>
        <td>${item.name}</td>
        <td class="text-end">
          <button type="button" class="btn btn-outline-danger btn-sm" data-category=${item.id}>удалить</button>
        </td>
      </tr> `,
      );

      select.insertAdjacentHTML(
        'beforeend',
        `
      <option value="${item.id}">${item.name}</option>
      `,
      );
    });
  };

  const checkValue = () => {
    if (nameInput.value === '' || imageInput.value === '') {
      saveBtn.disabled = true;
    } else {
      saveBtn.disabled = false;
    }
  };

  const updateTable = () => {
    getData('/categories').then((data) => {
      render(data);
    });
  };

  nameInput.addEventListener('input', () => {
    categoryData.name = nameInput.value;
    checkValue();
  });

  imageInput.addEventListener('input', () => {
    const file = imageInput.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
      const reader = new FileReader();

      reader.onload = () => {
        categoryData.preview = reader.result;
      };

      reader.onerror = () => {
        categoryData.preview = '';
        imageInput.value = '';
      };

      reader.readAsDataURL(file);
    } else {
      imageInput.value = '';
    }
    checkValue();
  });

  saveBtn.addEventListener('click', () => {
    postData('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      nameInput.value = '';
      imageInput.value = '';
      updateTable();
    });
  });

  container.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const id = event.target.dataset.category;

      deleteData(`/categories/${id}`).then((data) => {
        updateTable();
      });
    }
  });

  updateTable();
  checkValue();
};

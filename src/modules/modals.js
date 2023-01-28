export const openModal = (modal) => {
  const layout = document.createElement('div');
  layout.classList.add('modal-backdrop');
  layout.classList.add('fade');
  document.body.append(layout);

  modal.classList.add('d-block');

  setTimeout(() => {
    layout.classList.add('show');
    modal.classList.add('show');
  }, 100);
};

export const closeModal = (modal) => {
  const layout = document.querySelector('.modal-backdrop');
  layout && layout.classList.remove('show');
  modal.classList.remove('show');

  setTimeout(() => {
    modal.classList.remove('d-block');
    layout && layout.remove();
  }, 500);
};

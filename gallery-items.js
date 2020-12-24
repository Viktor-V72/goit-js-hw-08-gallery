const galleryList = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryRef = document.querySelector('.js-gallery');
const modalImg = document.querySelector('.lightbox__image');
const openModal = document.querySelector('.js-lightbox');
const buttonClose = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const modalOverlay = document.querySelector('.lightbox__overlay');
let imgNumber;



// динамическая разметка начало
const galleryForInsert = galleryList.map(image => {
  const previewImg = image.preview;
  const originalImg = image.original;
  const descrImg = image.description;
  
  const li = document.createElement('li');
  li.classList.add('gallery__item');

  const link = document.createElement('a')
  link.classList.add('gallery__link');
  link.setAttribute('href', originalImg);

  const img = document.createElement('img');
  img.classList.add('gallery__image');
  img.setAttribute('src', previewImg);
  img.setAttribute('data-source', originalImg);
  img.setAttribute('alt', descrImg);
  img.setAttribute('index', galleryList.indexOf(image));
  
  link.append(img);
  li.append(link);
  
  return li;
});

galleryRef.append(...galleryForInsert);
// динамическая разметка конец


galleryRef.addEventListener('click', onGalleryClick);
buttonClose.addEventListener('click', closeModal)   //закрытие по кнопке
modalOverlay.addEventListener('click', closeModal); //закрытие по серому фону

function onGalleryClick(event) {
  event.preventDefault();
  const imageRef = event.target;

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const largeImageURL = imageRef.dataset.source
  const imageAlt = imageRef.alt;
  modalImg.src = largeImageURL;
  modalImg.alt = imageAlt;

  openModal.classList.add('is-open');

  window.addEventListener('keydown', onPressEscape); //закрытие через Esc

  imgNumber = Number(imageRef.getAttribute('index'));

  window.addEventListener('keydown', onPressRightArrow);
  window.addEventListener('keydown', onPressLeftArrow);

}

function closeModal() {
  modalImg.src = '';
  modalImg.alt = '';
  openModal.classList.remove('is-open');
  window.removeEventListener('keydown', onPressEscape);
}

function onPressEscape(event){
  if (event.code === 'Escape') {
    closeModal();
  }
}


function onPressRightArrow(event) {
  if (imgNumber < galleryList.length - 1) {
    if (event.code === 'ArrowRight') {
      modalImg.src = galleryList[imgNumber += 1].original;
    }
  }
}

function onPressLeftArrow(event) {
  if (imgNumber > 0) {
    if (event.code === 'ArrowLeft') {
        modalImg.src = galleryList[imgNumber -= 1].original;
    }
  }
}





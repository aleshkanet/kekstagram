'use strict';

(function () {

  var PICTURES_AMOUNT = 25;
  var LIKES_COUNT_MIN = 15;
  var LIKES_COUNT_MAX = 200;
  var PICTURE_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var PICTURE_DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  function getRandomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }

  function getRandomElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  }

  function renderPicturesData() {
    var pictures = [];

    for (var i = 1; i <= PICTURES_AMOUNT; i++) {
      var subsetCommentsLength = getRandomInteger(1, PICTURE_COMMENTS.length);

      pictures.push({
        'url': 'photos/' + i + '.jpg',
        'likes': getRandomInteger(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
        'comments': PICTURE_COMMENTS.slice(subsetCommentsLength),
        'description': getRandomElement(PICTURE_DESCRIPTIONS)
      });

    }
    return pictures;
  }

  function renderPictures(arr) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
    var pictureList = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      var pictureElement = pictureTemplate.cloneNode(true);
      var current = arr[i];

      pictureElement.querySelector('.picture__img').setAttribute('src', current.url);
      pictureElement.querySelector('.picture__stat--comments').textContent = current.comments.length;
      pictureElement.querySelector('.picture__stat--likes').textContent = current.likes;

      pictureList.appendChild(pictureElement);
    }

    document.querySelector('.pictures').appendChild(pictureList);
  }

  function renderComments(arr) {
    var commentList = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {

      var listItem = document.createElement('li');
      listItem.classList.add('social__comment', 'social__comment--text');

      var avatarImage = document.createElement('img');
      avatarImage.classList.add('social__picture');
      avatarImage.setAttribute('src', 'img/avatar-' + getRandomInteger(1, 6) + '.svg');
      avatarImage.setAttribute('alt', 'Аватар комментатора фотографии');
      avatarImage.setAttribute('width', 35);
      avatarImage.setAttribute('height', 35);
      listItem.appendChild(avatarImage);

      var commentText = document.createElement('p');
      commentText.classList.add('social__text');
      commentText.innerText = arr[i];
      listItem.appendChild(commentText);

      commentList.appendChild(listItem);
    }

    var commentsBlock = document.querySelector('.social__comments');
    commentsBlock.innerHTML = '';
    commentsBlock.appendChild(commentList);
  }

  function renderBigPicture(picture) {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.querySelector('.big-picture__img img').setAttribute('src', picture.url);
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    renderComments(picture.comments);
    bigPicture.querySelector('.social__caption').textContent = picture.description;

    var loadMore = bigPicture.querySelector('.social__comment-loadmore');
    loadMore.classList.add('visually-hidden');

    var commentCount = bigPicture.querySelector('.social__comment-count');
    commentCount.classList.add('visually-hidden');

    bigPicture.classList.remove('hidden');
  }

  var picturesData = renderPicturesData();

  renderPictures(picturesData);
  renderBigPicture(picturesData[0]);

})();

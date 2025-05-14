const answers = [
    { text: "Ответ 1: ответ не найден", images: ["images/1.jpg"], copy: "ответ не найден" },
    { text: "Ответ 2: ", images: ["images/2.png"], copy: "25, 134" },
    { text: "Ответ 3: ответа нет", images: ["images/3.jpg"], copy: "нет" },
    { text: "Ответ 4: ответа нет", images: ["images/4.jpg"], copy: "нет" },
    { text: "Ответ 5: ответа нет", images: ["images/5.jpg"], copy: "нет" },
    { text: "Ответ 6: ", images: ["images/6.png"], copy: "25; 25" },
    { text: "Ответ 7: ", images: ["images/7.png"], copy: "534" },
    { text: "Ответ 8:  ", images: ["images/8.png"], copy: "1234579" },
    { text: "Ответ 9: ", images: ["images/9.png"], copy: "15" },
    { text: "Ответ 10: ", images: ["images/10.png"], copy: "159" },
    { text: "Ответ 11: ", images: ["images/11.png"], copy: "договоры" },
    { text: "Ответ 12:  ", images: ["images/12.png"], copy: "портмоне отца" },
    { text: "Ответ 13:  ", images: ["images/13.png"], copy: "35; 25; обмануть" }
  ];
  
  let current = 0;
  
  function renderAnswer() {
    const card = document.getElementById('answer-card');
    const answer = answers[current];
    let copyBlock = '';
    if (answer.copy) {
      copyBlock = `
        <span class=\"copy-answer\" onclick=\"copyToClipboard('${answer.copy}')\">“${answer.copy}”</span>
        <span id=\"copy-notice\" style=\"display:none; color: #22c55e; margin-left: 8px;\">Скопировано!</span>
      `;
    }
    card.innerHTML = `
      <div class=\"info-note\">там где ответы через ; это идет перечисление. Значит в том номере два задания, и ответы идут по порядку</div>
      <p>${answer.text} ${copyBlock}</p>
      <div class=\"images-block\">
        ${answer.images.map(img => `<img src=\"${img}\" alt=\"Фото ответа\">`).join('')}
      </div>
    `;
    enableImageZoom();
  }
  
  function renderPagination() {
    const pag = document.getElementById('pagination');
    pag.innerHTML = '';
    answers.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'page-btn' + (i === current ? ' active' : '');
      btn.textContent = i + 1;
      btn.onclick = () => {
        current = i;
        renderAnswer();
        renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      pag.appendChild(btn);
    });
  }

// Создаём модальное окно для увеличения картинки
const modal = document.createElement('div');
modal.id = 'img-modal';
modal.innerHTML = `
  <div class=\"modal-backdrop\"></div>
  <img id=\"modal-img\" src=\"\" alt=\"Увеличенное фото\">
`;
document.body.appendChild(modal);

modal.onclick = () => {
  modal.classList.remove('open');
  document.body.style.overflow = '';
};

function enableImageZoom() {
  document.querySelectorAll('.images-block img').forEach(img => {
    img.onclick = (e) => {
      e.stopPropagation();
      document.getElementById('modal-img').src = img.src;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
  });
}

window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    const notice = document.getElementById('copy-notice');
    if (notice) {
      notice.style.display = 'inline';
      setTimeout(() => { notice.style.display = 'none'; }, 1200);
    }
  });
};

  renderAnswer();
  renderPagination();
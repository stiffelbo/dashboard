/* global Chart, chart */
const select = {

  burger: '.menu__burger',
  navLinks: '.nav__link',
  sections: '.section',
  btnTrash: '.js_trash',
  chart: '#myChart',
  modal: {
    default: '#myModal',
    modal: '.modal',
    btnClose: '.btn-close',
    btnCloseJs: '#overlay .js--close-modal',
  },

  containerOf: {
    overlay: '.overlay',
    header: '.header',
    nav: '.nav__list',
    sidebar: '.sidebar',
    pages: '.pages',
    pageWrapper: '.container-page',
  },

  
};

const classNames = {
  sidebarToggle: 'sidebar-enabled',
  pagesToggle: 'pages-squize',
  headerToggle: 'header-fixed',
  notActive: 'd-none',
  show: 'show',
};

const header = document.querySelector(select.containerOf.header);
const sidebar = document.querySelector(select.containerOf.sidebar);
const pages = document.querySelector(select.containerOf.pages);
const burger = document.querySelector(select.burger);
const navLinks = document.querySelectorAll(select.navLinks);
const sections = document.querySelectorAll(select.sections);
const overlay = document.querySelector(select.containerOf.overlay);
const modalCloseBtn = document.querySelectorAll(select.modal.btnCloseJs);
const btnTrash = document.querySelectorAll(select.btnTrash);

function activateAsside() {
  header.classList.toggle(classNames.headerToggle);
  sidebar.classList.toggle(classNames.sidebarToggle);
  pages.classList.toggle(classNames.pagesToggle);
}
//Add toggling sidebar to burger

burger.addEventListener('click', function() {
  activateAsside();
});

//Add hiding sidebar handler to all links --> clink link sidebar will hide
for (let link of navLinks) {
  link.addEventListener('click', function(event) {
    activateAsside();
    const clickedElement = this;
    event.preventDefault();
    /* get page id from href */
    const id = clickedElement.getAttribute('href').replace('#', '');
    console.log('clicked ', id);
    //for every section - page
    for (let section of sections) {
      const sectionId = section.getAttribute('id');
      //clear d-none to make sure not clicke pages do not have it multiple times           
      section.classList.remove(classNames.notActive);
      if (sectionId != id) {
        section.classList.add(classNames.notActive);
      }
    }
  });
}

//modal close function
function closeModal() {
  document.querySelector(select.containerOf.overlay).classList.remove(classNames.show);
}

//append close action to close buttons
modalCloseBtn.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    closeModal();
  });
});

//append close action to overlay bg
overlay.addEventListener('click', () => {
  console.log('overlay bg clicked');
  closeModal();  
});

//append close actin to ESC button press evt
document.addEventListener('keyup', function(e) {
  if(e.keyCode == 27){
    closeModal();
  }
});


//show modal func

function openModal(modal) {
  document.querySelectorAll(select.containerOf.overlay + '> *').forEach(function(modal) {
    modal.classList.remove(classNames.show);
  });
  overlay.classList.add(classNames.show);
  document.querySelector(modal).classList.add(classNames.show);
}

//append show modal to trash btns
btnTrash.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();    
    openModal(select.modal.default);
  });
});

//Charts, getting canvas context
const ctx = document.querySelector(select.chart).getContext('2d');
const chart = new Chart (ctx, {
  // 1
  type: 'bar',
  data: {
    // 2
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
    // 3
    datasets: [{
      // 4
      label: 'Signups',
      // 5
      backgroundColor: '#8DBEC8',
      borderColor: '#8DBEC8',
      // 6
      data: [ 52, 51, 41, 94, 26, 6, 72, 9, 21, 88 ],
    },
    {
      label: 'FTD',
      backgroundColor: '#F29E4E',
      borderColor: '#F29E4E',
      data: [ 6, 72, 1, 0, 47, 11, 50, 44, 63, 76 ],
    },
    {
      label: 'Earned',
      backgroundColor: '#71B374',
      borderColor: '#71B374',
      data: [ 59, 49, 68, 90, 67, 41, 13, 38, 48, 48 ],
      // 7
      hidden: true,
    }]
  },
});

console.log(chart);








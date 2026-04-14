   function toggleMobileMenu(button) {
      const nav = document.querySelector('.mobile-nav');
      nav.classList.toggle('active');


      button.classList.toggle('open');
    }









    function loadHTML(id, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

loadHTML("header", "../html/header.html");
loadHTML("footer", "../html/footer.html");
loadHTML("hero", "../html/hero.html");






const buttons = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-tab');

    buttons.forEach(btn => btn.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});





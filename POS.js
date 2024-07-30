const allSideMenu = document.querySelectorAll('.sidebar .side-menu li a');

allSideMenu.forEach(item => {
  const li = item.parentElement;

  item.addEventListener('click', function() {
    // Remove 'active' class from all menu items
    allSideMenu.forEach(i => i.parentElement.classList.remove('active'));
    // Add 'active' class to the clicked menu item
    li.classList.add('active');
  });
});
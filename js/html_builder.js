fetch("../components/header.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("header").innerHTML = data;
  });

fetch("../components/rightcolumn.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.getElementById("right").innerHTML = data;
});


fetch("../components/footer.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("footer").innerHTML = data;
});
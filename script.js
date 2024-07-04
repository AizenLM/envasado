document.addEventListener("DOMContentLoaded", function () {
  const pdfList = document.getElementById("pdf-list");
  const monthSelect = document.getElementById("month-select");
  const btnLeon = document.getElementById("btn-leon");
  const btnVictorioso = document.getElementById("btn-victorioso");
  const noResultMessage = document.getElementById("message-error");
  const teamTitle = document.getElementById("team");
  const spanItem = document.createElement("span");
  let team = "";
  let pdfs = {};

  function loadPdfs(month, team) {
    pdfList.innerHTML = "";
    spanItem.textContent = team.toUpperCase();
    if (team == "") spanItem.textContent = "León y Victoriosos";
    teamTitle.appendChild(spanItem);
    noResultMessage.style.display = "none";
    let found = false;

    if (!team) {
      Object.keys(pdfs).forEach((team) => {
        pdfs[team].forEach((pdf) => {
          if (
            month === "todos" ||
            pdf.month.toLowerCase() === month.toLowerCase()
          ) {
            displayPdf(pdf);
            found = true;
          }
        });
      });
    } else {
      pdfs[team].forEach((pdf) => {
        if (
          month === "todos" ||
          pdf.month.toLowerCase() === month.toLowerCase()
        ) {
          displayPdf(pdf);
          found = true;
        }
      });
    }
    if (!found) {
      noResultMessage.style.display = "block";
    }
  }
  function displayPdf(pdf) {
    const pdfItem = document.createElement("div");
    pdfItem.className = "pdf-item";

    const pdfTitle = document.createElement("h2");
    pdfTitle.textContent = pdf.name;

    const pdfTeam = document.createElement("h3");
    pdfTeam.textContent = `Equipo: ${pdf.team}`;

    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";

    const pdfImage = document.createElement("img");
    pdfImage.src = pdf.img;
    pdfImage.alt = pdf.name;

    imgContainer.appendChild(pdfImage);

    pdfItem.appendChild(pdfTitle);
    pdfItem.appendChild(pdfTeam);
    pdfItem.appendChild(imgContainer);
    pdfList.appendChild(pdfItem);
  }

  function loadPdfsByTeam(selectedTeam) {
    team = selectedTeam;
    loadPdfs(monthSelect.value, team);
  }

  monthSelect.addEventListener("change", function () {
    loadPdfs(this.value, team);
  });

  btnLeon.addEventListener("click", function () {
    loadPdfsByTeam("leon");
  });

  btnVictorioso.addEventListener("click", function () {
    loadPdfsByTeam("victorioso");
  });

  // Cargar reconocimientos del mes inicial
  function fetchPdfs() {
    fetch("./data/reconocimiento.json")
      .then((response) => response.json())
      .then((data) => {
        pdfs = data;
        loadPdfs(monthSelect.value, team);
        console.log(pdfs);
      })
      .catch((error) =>
        console.error("Error al cargar el archivo JSON:", error)
      );
  }

  fetchPdfs();
});

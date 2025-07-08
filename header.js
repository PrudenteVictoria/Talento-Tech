      let ultimoScroll = 0;
      const header = document.querySelector("header");

      window.addEventListener("scroll", () => {
        const scrollActual = window.scrollY;

        if (scrollActual > ultimoScroll && scrollActual > 50) {
          header.classList.add("ocultar-header");
        } else {
          header.classList.remove("ocultar-header");
        }

        ultimoScroll = scrollActual;
      });
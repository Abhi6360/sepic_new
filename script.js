const navToggle = document.querySelector(".nav-toggle");
const siteMenu = document.querySelector(".site-menu");
const form = document.querySelector("#quote-form");
const statusMessage = document.querySelector("#form-status");
const year = document.querySelector("#year");
const revealItems = document.querySelectorAll("[data-reveal]");
const counters = document.querySelectorAll("[data-count]");
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

if (year) {
  year.textContent = new Date().getFullYear();
}

if ("IntersectionObserver" in window) {
  document.body.classList.add("reveal-ready");
}

if (navToggle && siteMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      siteMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      dropdownToggles.forEach((toggle) => {
        toggle.setAttribute("aria-expanded", "false");
        toggle.closest(".nav-item")?.classList.remove("is-active");
      });
    }
  });
}

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const navItem = toggle.closest(".nav-item");
    const willOpen = !navItem?.classList.contains("is-active");

    dropdownToggles.forEach((itemToggle) => {
      itemToggle.setAttribute("aria-expanded", "false");
      itemToggle.closest(".nav-item")?.classList.remove("is-active");
    });

    if (navItem && willOpen) {
      navItem.classList.add("is-active");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
});

document.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest(".nav-item")) {
    return;
  }

  dropdownToggles.forEach((toggle) => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.closest(".nav-item")?.classList.remove("is-active");
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const counter = entry.target;
        const target = Number(counter.getAttribute("data-count"));
        const duration = 900;
        const started = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - started) / duration, 1);
          counter.textContent = String(Math.round(progress * target));

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
        counterObserver.unobserve(counter);
      });
    },
    { threshold: 0.7 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach((counter) => {
    counter.textContent = counter.getAttribute("data-count") || counter.textContent;
  });
}

if (form && statusMessage) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const service = String(data.get("service") || "").trim();
    const message = String(data.get("message") || "").trim();
    const honeypot = String(data.get("_honey") || "").trim();

    if (honeypot) {
      statusMessage.textContent = "Thanks. Your project details were sent to sales@sepic.in.";
      form.reset();
      return;
    }

    const payload = {
      name,
      email,
      service,
      message,
      _subject: `SEPIC project request from ${name || "website lead"}`,
      _template: "table",
      _captcha: "false",
    };

    statusMessage.textContent = "Sending your project details to sales@sepic.in...";

    try {
      const response = await fetch("https://formsubmit.co/ajax/sales@sepic.in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("The form endpoint did not accept the submission.");
      }

      form.reset();
      statusMessage.textContent = "Thanks. Your project details were sent to sales@sepic.in.";
    } catch (error) {
      statusMessage.textContent = "Direct send failed, opening the secure fallback submit page.";
      form.submit();
    }
  });
}

if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);
// Навыки: уровень в процентах, шкала из 10 сегментов
const groups = [
  { title: "Frontend", items: [["HTML", 90, "уверенно"], ["CSS", 85, "уверенно"], ["JavaScript", 55, "изучаю"]] },
  { title: "Backend", items: [["PHP", 50, "базово"], ["SQL", 45, "изучаю"], ["Python", 35, "немного"]] },
  { title: "Инструменты", items: [["Git", 75, "уверенно"], ["Figma", 70, "уверенно"], ["Photoshop", 65, "уверенно"], ["VS Code", 90, "уверенно"]] }
];

const root = document.getElementById("skill-groups");
root.innerHTML = groups.map(g => `
  <article class="win">
    <div class="win__bar"><i></i><i></i><i></i><b>${g.title.toLowerCase()}.sys</b></div>
    <div class="win__body">
      <h3 class="group">${g.title}</h3>
      ${g.items.map(([name, pct, note]) => `
        <div class="skill">
          <div class="skill__row"><span>${name}</span><span><span data-n="${pct}">${pct}</span>% <em>${note}</em></span></div>
          <div class="bar" style="--p:${pct}%" role="img" aria-label="${name}: ${pct}%"></div>
        </div>`).join("")}
    </div>
  </article>`).join("");

// Возраст считается от даты рождения
const birth = new Date(2007, 2, 6), now = new Date();
let age = now.getFullYear() - birth.getFullYear();
if (now < new Date(now.getFullYear(), 2, 6)) age--;
document.getElementById("age").textContent = age + " " + (age % 10 === 1 && age !== 11 ? "год" : [2,3,4].includes(age % 10) && ![12,13,14].includes(age) ? "года" : "лет");

// Часы по Вологде
const clock = document.getElementById("clock");
const tick = () => clock.textContent = new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Moscow" });
tick(); setInterval(tick, 30000);

// Анимации: появление блоков, счётчики процентов, подсветка за курсором
try {
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
const count = el => {
  const n = +el.dataset.n; if (still) return;
  const t0 = performance.now();
  (function step(t) { const k = Math.min((t - t0) / 1100, 1); el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); })(t0);
};
const items = document.querySelectorAll(".win, .tags li, h2");
items.forEach(el => el.style.setProperty("--i", [...el.parentNode.children].indexOf(el) % 6));
if (!("IntersectionObserver" in window)) throw new Error("нет IntersectionObserver");
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in"); e.target.querySelectorAll("[data-n]").forEach(count); io.unobserve(e.target);
}), { threshold: .15, rootMargin: "0px 0px -8% 0px" });
items.forEach(el => io.observe(el));

const hero = document.querySelector(".hero");
hero.addEventListener("pointermove", e => {
  const r = hero.getBoundingClientRect();
  hero.style.setProperty("--mx", e.clientX - r.left + "px"); hero.style.setProperty("--my", e.clientY - r.top + "px");
});
document.documentElement.classList.add("js"); // прячем блоки только когда всё подготовлено
} catch (err) {
  console.error("Анимации отключены:", err);
  document.documentElement.classList.remove("js");
}

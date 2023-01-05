import "./style.css";

const app = document.createElement("div");
app.id = "app";
document.body.appendChild(app);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /*html */ `
  <div class="text-4xl">
    Hi there!
  </div>
`;

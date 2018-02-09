(function() {
  console.log("running..");
  const scripts = [];

  // Dynamically insert the DLL script in development env in the
  // renderer process
  if (process.env.NODE_ENV === "development") {
    scripts.push("../dll/renderer.dev.dll.js");
  }

  // Dynamically insert the bundled app script in the renderer process
  const port = process.env.PORT || 1213;
  scripts.push(
    process.env.HOT ? `http://localhost:${port}/dist/renderer.dev.js` : "./dist/renderer.prod.js"
  );
  document.write(scripts.map((script) => `<script defer src=${script}></script>`).join(""));
})();

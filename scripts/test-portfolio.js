const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runQA() {
  console.log("=== STARTING COMPREHENSIVE HOGWARTS PORTFOLIO QA ===");

  const screenshotsDir = path.join(__dirname, "../public/qa-screenshots");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--enable-webgl",
      "--ignore-gpu-blocklist",
    ],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();

  const consoleLogs = [];
  const errors = [];

  page.on("console", (msg) => {
    const text = msg.text();
    consoleLogs.push({ type: msg.type(), text });
    if (msg.type() === "error") {
      errors.push(text);
      console.error("[PAGE ERROR]:", text);
    }
  });

  page.on("pageerror", (err) => {
    errors.push(err.toString());
    console.error("[PAGE EXCEPTION]:", err);
  });

  console.log("1. Navigating to http://localhost:3002...");
  await page.goto("http://localhost:3002", { waitUntil: "networkidle2", timeout: 20000 });

  console.log("2. Verifying Intro screen elements...");
  await page.waitForSelector("h1", { timeout: 10000 });

  const headingText = await page.$eval("h1", (el) => el.innerText);
  console.log("Found Heading:", headingText);

  // Take screenshot of Intro
  await page.screenshot({ path: path.join(screenshotsDir, "01-intro.png") });
  console.log("Saved: 01-intro.png");

  // Click 'Enter the Wizarding World'
  console.log("3. Clicking 'Enter the Wizarding World' gate button...");
  const confettiCanvasCountBefore = await page.$$eval("canvas", (canvases) => canvases.length);

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const enterBtn = btns.find((b) => b.innerText.includes("Enter the Wizarding World") || b.innerText.includes("ENTER"));
    if (enterBtn) {
      enterBtn.click();
    } else {
      console.log("Enter button not found in buttons:", btns.map(b => b.innerText));
    }
  });

  // Verify no confetti canvas was added
  await sleep(400);
  const confettiCanvasCountAfter = await page.$$eval("canvas", (canvases) => canvases.length);
  console.log(`Canvas count before: ${confettiCanvasCountBefore}, after click: ${confettiCanvasCountAfter}`);
  if (confettiCanvasCountAfter > confettiCanvasCountBefore) {
    console.warn("WARNING: Extra canvas created after clicking Enter (possibly confetti)!");
  } else {
    console.log("CONFIRMED: No confetti burst canvas spawned on Enter click.");
  }

  // Wait for transition into chapter 1
  await sleep(1500);
  await page.screenshot({ path: path.join(screenshotsDir, "02-chapter1-awakening.png") });
  console.log("Saved: 02-chapter1-awakening.png");

  // Verify WebGL Canvas
  const hasCanvas = await page.$eval("canvas", (el) => !!el);
  console.log("3D WebGL Canvas rendered:", hasCanvas);

  // Scroll to Chapter 2: Chamber of Secrets
  console.log("4. Scrolling to Chapter 2 (Chamber of Secrets)...");
  await page.evaluate(() => {
    const el = document.getElementById("chamber-of-secrets");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  });
  await sleep(1200);
  await page.screenshot({ path: path.join(screenshotsDir, "03-chapter2-chamber.png") });
  console.log("Saved: 03-chapter2-chamber.png");

  // Scroll to Chapter 3: Prisoner of Azkaban
  console.log("5. Scrolling to Chapter 3 (Prisoner of Azkaban)...");
  await page.evaluate(() => {
    const el = document.getElementById("prisoner-of-azkaban");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  });
  await sleep(1500);
  await page.screenshot({ path: path.join(screenshotsDir, "04-chapter3-azkaban.png") });
  console.log("Saved: 04-chapter3-azkaban.png");

  // In Chapter 3: Test tab switching and verify skill boxes animation
  console.log("5b. Testing Chapter 3 Tab Switch and Multi-Directional Skill Boxes...");
  const tabSwitched = await page.evaluate(() => {
    const catButtons = Array.from(document.querySelectorAll("#prisoner-of-azkaban button"));
    if (catButtons.length > 2) {
      catButtons[2].click(); // click 3rd category tab
      return catButtons[2].innerText;
    }
    return null;
  });
  console.log("Switched to Tab:", tabSwitched);
  await sleep(1200);
  await page.screenshot({ path: path.join(screenshotsDir, "04b-chapter3-tab-switch.png") });
  console.log("Saved: 04b-chapter3-tab-switch.png");

  // Scroll to Chapter 4: Goblet of Fire
  console.log("6. Scrolling to Chapter 4 (Goblet of Fire)...");
  await page.evaluate(() => {
    const el = document.getElementById("goblet-of-fire");
    if (el) el.scrollIntoView();
  });
  await sleep(1200);
  await page.screenshot({ path: path.join(screenshotsDir, "05-chapter4-goblet.png") });
  console.log("Saved: 05-chapter4-goblet.png");

  // Scroll to Chapter 5: Order of the Phoenix
  console.log("7. Scrolling to Chapter 5 (Order of the Phoenix)...");
  await page.evaluate(() => {
    const el = document.getElementById("order-of-phoenix");
    if (el) el.scrollIntoView();
  });
  await sleep(1200);
  await page.screenshot({ path: path.join(screenshotsDir, "06-chapter5-phoenix.png") });
  console.log("Saved: 06-chapter5-phoenix.png");

  // Click an artifact in Chapter 5 to open the Project Modal
  console.log("8. Testing Project Details Modal...");
  await page.evaluate(() => {
    const artifactCard = document.querySelector("#order-of-phoenix .cursor-pointer");
    if (artifactCard) artifactCard.click();
  });
  await sleep(1000);
  await page.screenshot({ path: path.join(screenshotsDir, "07-project-modal.png") });
  console.log("Saved: 07-project-modal.png");

  // Close modal
  await page.evaluate(() => {
    const closeBtn = document.querySelector("button[aria-label='Close Artifact']");
    if (closeBtn) closeBtn.click();
  });
  await sleep(600);

  // Scroll to Chapter 6: Half-Blood Prince
  console.log("9. Scrolling to Chapter 6 (Half-Blood Prince)...");
  await page.evaluate(() => {
    const el = document.getElementById("half-blood-prince");
    if (el) el.scrollIntoView();
  });
  await sleep(1200);
  await page.screenshot({ path: path.join(screenshotsDir, "08-chapter6-pensieve.png") });
  console.log("Saved: 08-chapter6-pensieve.png");

  // Scroll to Chapter 7: Deathly Hallows Part 1
  console.log("10. Scrolling to Chapter 7 (Deathly Hallows Part 1)...");
  await page.evaluate(() => {
    const el = document.getElementById("deathly-hallows-1");
    if (el) el.scrollIntoView();
  });
  await sleep(1200);
  await page.screenshot({ path: path.join(screenshotsDir, "09-chapter7-journey.png") });
  console.log("Saved: 09-chapter7-journey.png");

  // Scroll to Chapter 8: Deathly Hallows Part 2
  console.log("11. Scrolling to Chapter 8 (Deathly Hallows Part 2)...");
  await page.evaluate(() => {
    const el = document.getElementById("deathly-hallows-2");
    if (el) el.scrollIntoView();
  });
  await sleep(1200);
  await page.screenshot({ path: path.join(screenshotsDir, "10-chapter8-finale.png") });
  console.log("Saved: 10-chapter8-finale.png");

  // Verify Resume download link
  const resumeHref = await page.evaluate(() => {
    const resumeLinks = Array.from(document.querySelectorAll("a[download]"));
    return resumeLinks.map((a) => a.getAttribute("href"));
  });
  console.log("Resume download links verified:", resumeHref);

  await browser.close();

  console.log("\n=== QA SUMMARY ===");
  console.log("Total Console Errors:", errors.length);
  if (errors.length > 0) {
    console.log("Errors caught:", errors);
  } else {
    console.log("ZERO console errors detected! Flawless execution.");
  }
}

runQA().catch((e) => {
  console.error("QA script failed:", e);
  process.exit(1);
});

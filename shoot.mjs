import { chromium } from "playwright";

const BASE = "http://localhost:4322/";

const shots = async () => {
  const browser = await chromium.launch({
    executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  await page.goto(BASE, { waitUntil: "networkidle" });

  // Wait out the ~2.7s loading screen + fade
  await page.waitForTimeout(4200);

  // 1) Hero (top of page)
  await page.screenshot({ path: "/tmp/shot-hero.png" });

  // Full-page screenshot for an overview
  await page.screenshot({ path: "/tmp/shot-full.png", fullPage: true });

  // 2) Scroll to a few sections and grab viewport shots
  const sections = [
    ["#services", "shot-services"],
    ["#about", "shot-about"],
    ["#listings", "shot-listings"],
    ["#finance", "shot-finance"],
    ["#contact", "shot-contact"],
  ];

  for (const [sel, name] of sections) {
    const el = await page.$(sel);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1200); // let whileInView animations settle
      await page.screenshot({ path: `/tmp/${name}.png` });
    }
  }

  await browser.close();
  console.log("screenshots done");
};

shots().catch((e) => {
  console.error(e);
  process.exit(1);
});

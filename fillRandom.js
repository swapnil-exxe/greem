import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";
import util from "util";

const path = "./data.json";
const writeJson = util.promisify(jsonfile.writeFile);
const git = simpleGit();

const start = moment("2025-12-15");
const end = moment("2026-07-03");

const main = async () => {
  const commitsList = [];
  let curr = moment(start);

  while (curr.isSameOrBefore(end)) {
    const dayOfWeek = curr.day(); // 0 is Sunday, 6 is Saturday
    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
    
    // Probability of having commits on a given day (higher on weekdays)
    const prob = isWeekend ? 0.20 : 0.70;
    
    if (Math.random() < prob) {
      // Determine number of commits (for various shades of green)
      const rand = Math.random();
      let count = 1;
      if (rand < 0.50) {
        count = random.int(1, 2);   // Light Green (Level 1)
      } else if (rand < 0.80) {
        count = random.int(3, 5);   // Mid Green (Level 2)
      } else if (rand < 0.95) {
        count = random.int(6, 8);   // Dark Green (Level 3)
      } else {
        count = random.int(9, 13);  // Very Dark Green (Level 4)
      }

      for (let i = 0; i < count; i++) {
        // Realistic commit times spread across daytime hours
        const realisticDate = moment(curr)
          .add(random.int(9, 21), "h")
          .add(random.int(0, 59), "m")
          .add(random.int(0, 59), "s")
          .format();
        commitsList.push(realisticDate);
      }
    }
    curr.add(1, "d");
  }

  console.log(`Generated ${commitsList.length} commits between ${start.format("YYYY-MM-DD")} and ${end.format("YYYY-MM-DD")}.`);
  console.log("Starting git commit process...");

  let currentCount = 0;
  for (const date of commitsList) {
    currentCount++;
    const data = { date };
    await writeJson(path, data);
    await git.add(path);
    await git.commit(date, { "--date": date });

    if (currentCount % 50 === 0 || currentCount === commitsList.length) {
      console.log(`Progress: ${currentCount}/${commitsList.length} commits generated.`);
    }
  }

  console.log("Commit generation finished locally. Ready for force push.");
};

main().catch(err => {
  console.error("Error: ", err);
});

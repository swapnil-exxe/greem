import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";
import readline from "readline";
import util from "util";

const path = "./data.json";
const writeJson = util.promisify(jsonfile.writeFile);
const git = simpleGit();

// 5x7 Pixel Font Definitions (7 rows high, variable width)
const FONT = {
  'A': [
    " ### ",
    "#   #",
    "#   #",
    "#####",
    "#   #",
    "#   #",
    "#   #"
  ],
  'B': [
    "#### ",
    "#   #",
    "#### ",
    "#   #",
    "#   #",
    "#### ",
    "     "
  ],
  'C': [
    " ####",
    "#    ",
    "#    ",
    "#    ",
    "#    ",
    "#    ",
    " ####"
  ],
  'D': [
    "#### ",
    "#   #",
    "#   #",
    "#   #",
    "#   #",
    "#### ",
    "     "
  ],
  'E': [
    "#####",
    "#    ",
    "#    ",
    "#### ",
    "#    ",
    "#    ",
    "#####"
  ],
  'F': [
    "#####",
    "#    ",
    "#    ",
    "#### ",
    "#    ",
    "#    ",
    "#    "
  ],
  'G': [
    " ####",
    "#    ",
    "#    ",
    "#  ##",
    "#   #",
    "#   #",
    " ####"
  ],
  'H': [
    "#   #",
    "#   #",
    "#   #",
    "#####",
    "#   #",
    "#   #",
    "#   #"
  ],
  'I': [
    "###",
    " # ",
    " # ",
    " # ",
    " # ",
    " # ",
    "###"
  ],
  'J': [
    "  ###",
    "    #",
    "    #",
    "    #",
    "    #",
    "#   #",
    " ### "
  ],
  'K': [
    "#   #",
    "#  # ",
    "# #  ",
    "##   ",
    "# #  ",
    "#  # ",
    "#   #"
  ],
  'L': [
    "#    ",
    "#    ",
    "#    ",
    "#    ",
    "#    ",
    "#    ",
    "#####"
  ],
  'M': [
    "#   #",
    "## ##",
    "# # #",
    "#   #",
    "#   #",
    "#   #",
    "#   #"
  ],
  'N': [
    "#   #",
    "##  #",
    "# # #",
    "#  ##",
    "#   #",
    "#   #",
    "#   #"
  ],
  'O': [
    " ### ",
    "#   #",
    "#   #",
    "#   #",
    "#   #",
    "#   #",
    " ### "
  ],
  'P': [
    "#### ",
    "#   #",
    "#   #",
    "#### ",
    "#    ",
    "#    ",
    "#    "
  ],
  'Q': [
    " ### ",
    "#   #",
    "#   #",
    "#   #",
    "# # #",
    "#  # ",
    " ## #"
  ],
  'R': [
    "#### ",
    "#   #",
    "#   #",
    "#### ",
    "# #  ",
    "#  # ",
    "#   #"
  ],
  'S': [
    " ####",
    "#    ",
    " ### ",
    "    #",
    "    #",
    "#   #",
    "#### "
  ],
  'T': [
    "#####",
    "  #  ",
    "  #  ",
    "  #  ",
    "  #  ",
    "  #  ",
    "  #  "
  ],
  'U': [
    "#   #",
    "#   #",
    "#   #",
    "#   #",
    "#   #",
    "#   #",
    " ### "
  ],
  'V': [
    "#   #",
    "#   #",
    "#   #",
    "#   #",
    " # # ",
    " # # ",
    "  #  "
  ],
  'W': [
    "#   #",
    "#   #",
    "#   #",
    "# # #",
    "# # #",
    "## ##",
    "#   #"
  ],
  'X': [
    "#   #",
    "#   #",
    " # # ",
    "  #  ",
    " # # ",
    "#   #",
    "#   #"
  ],
  'Y': [
    "#   #",
    "#   #",
    " # # ",
    "  #  ",
    "  #  ",
    "  #  ",
    "  #  "
  ],
  'Z': [
    "#####",
    "    #",
    "   # ",
    "  #  ",
    " #   ",
    "#    ",
    "#####"
  ],
  '0': [
    " ### ",
    "#  ##",
    "# # #",
    "##  #",
    "#   #",
    "#   #",
    " ### "
  ],
  '1': [
    "  #  ",
    " ##  ",
    "  #  ",
    "  #  ",
    "  #  ",
    "  #  ",
    " ### "
  ],
  '2': [
    " ### ",
    "#   #",
    "    #",
    "   # ",
    "  #  ",
    " #   ",
    "#####"
  ],
  '3': [
    "#### ",
    "    #",
    "    #",
    " ### ",
    "    #",
    "    #",
    "#### "
  ],
  '4': [
    "#   #",
    "#   #",
    "#   #",
    "#####",
    "    #",
    "    #",
    "    #"
  ],
  '5': [
    "#####",
    "#    ",
    "#    ",
    "#### ",
    "    #",
    "    #",
    "#### "
  ],
  '6': [
    " ####",
    "#    ",
    "#    ",
    "#### ",
    "#   #",
    "#   #",
    " ####"
  ],
  '7': [
    "#####",
    "    #",
    "   # ",
    "  #  ",
    " #   ",
    "#    ",
    "#    "
  ],
  '8': [
    " ### ",
    "#   #",
    "#   #",
    " ### ",
    "#   #",
    "#   #",
    " ### "
  ],
  '9': [
    " ####",
    "#   #",
    "#   #",
    " ####",
    "    #",
    "    #",
    " ####"
  ],
  ' ': [
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "  "
  ]
};

// Preset Patterns
const PATTERNS = {
  'heart': [
    "  # #   # #  ",
    " ##### ##### ",
    "#############",
    " ########### ",
    "  _________  ", // Using underscore for custom level representation if needed
    "   _______   ",
    "     ___     "
  ],
  'smiley': [
    "   #####   ",
    " #       # ",
    "#  #   #  #",
    "#         #",
    "#  #   #  #",
    " #  ###  # ",
    "   #####   "
  ],
  'checkerboard': [
    "# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #",
    " # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ",
    "# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #",
    " # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ",
    "# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #",
    " # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ",
    "# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #"
  ]
};

// Contribution level color density configurations
const DENSITY_MAPS = {
  'low': { 0: 0, 1: 1, 2: 1, 3: 2, 4: 2 },
  'medium': { 0: 0, 1: 1, 2: 3, 3: 5, 4: 6 },
  'high': { 0: 0, 1: 2, 2: 5, 3: 8, 4: 12 },
  'gradient': { 0: 0, 1: 1, 2: 4, 3: 8, 4: 15 }
};

// Helper: Get columns for a character
const getCharColumns = (char) => {
  const definition = FONT[char.toUpperCase()] || FONT[' '];
  const numRows = definition.length;
  const numCols = definition[0].length;
  const cols = [];
  for (let c = 0; c < numCols; c++) {
    const col = [];
    for (let r = 0; r < numRows; r++) {
      col.push(definition[r][c] === '#' ? 4 : 0);
    }
    cols.push(col);
  }
  return cols;
};

// Helper: Convert string input to columns
const stringToColumns = (str) => {
  const cols = [];
  for (let i = 0; i < str.length; i++) {
    cols.push(...getCharColumns(str[i]));
    if (i < str.length - 1) {
      cols.push([0, 0, 0, 0, 0, 0, 0]); // Spacer column between characters
    }
  }
  return cols;
};

// Helper: Convert preset pattern to columns
const patternToColumns = (patternName) => {
  const pattern = PATTERNS[patternName.toLowerCase()];
  if (!pattern) return [];
  const numRows = pattern.length;
  const numCols = pattern[0].length;
  const cols = [];
  for (let c = 0; c < numCols; c++) {
    const col = [];
    for (let r = 0; r < numRows; r++) {
      const char = pattern[r][c];
      if (char === '#' || char === '@') col.push(4);
      else if (char === '*' || char === '=') col.push(3);
      else if (char === '+' || char === '_') col.push(2);
      else if (char === '-' || char === '.') col.push(1);
      else col.push(0);
    }
    cols.push(col);
  }
  return cols;
};

// Helper: Position columns on the final 53x7 grid
const positionOnGrid = (patternCols) => {
  const grid = Array.from({ length: 53 }, () => Array(7).fill(0));
  if (patternCols.length === 0) return grid;

  let sourceCols = patternCols;
  if (sourceCols.length > 53) {
    sourceCols = sourceCols.slice(0, 53);
  }
  const padLeft = Math.floor((53 - sourceCols.length) / 2);
  for (let c = 0; c < sourceCols.length; c++) {
    grid[padLeft + c] = sourceCols[c];
  }
  return grid;
};

// Print visual grid representation to the console
const printPreview = (grid) => {
  console.log("\n   " + "=".repeat(106));
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let r = 0; r < 7; r++) {
    let rowStr = `${dayNames[r]} |`;
    for (let c = 0; c < 53; c++) {
      const val = grid[c][r];
      if (val === 0) rowStr += "\x1b[90m░░\x1b[0m"; // Light Gray
      else if (val === 1) rowStr += "\x1b[38;5;107m▒▒\x1b[0m"; // Light Green
      else if (val === 2) rowStr += "\x1b[38;5;71m▒▒\x1b[0m"; // Medium Green
      else if (val === 3) rowStr += "\x1b[38;5;28m▓▓\x1b[0m"; // Dark Green
      else rowStr += "\x1b[38;5;22m██\x1b[0m"; // Very Dark Green
    }
    console.log(rowStr + "|");
  }
  console.log("   " + "=".repeat(106));
  console.log("Color Legend: \x1b[90m░░\x1b[0m (0)  \x1b[38;5;107m▒▒\x1b[0m (Level 1)  \x1b[38;5;71m▒▒\x1b[0m (Level 2)  \x1b[38;5;28m▓▓\x1b[0m (Level 3)  \x1b[38;5;22m██\x1b[0m (Level 4)\n");
};

// Helper: Get commit count for a level and density
const getCommitCount = (level, densityMode) => {
  if (level === 0) return 0;
  if (densityMode === 'random') {
    return random.int(1, 10);
  }
  const map = DENSITY_MAPS[densityMode] || DENSITY_MAPS['medium'];
  return map[level] || 0;
};

// Core Execution: Create and push commits
const executeCommits = async (grid, densityMode, dryRun) => {
  const startOfGraph = moment().subtract(1, "y").startOf('week');
  const commitsList = [];

  for (let c = 0; c < 53; c++) {
    for (let r = 0; r < 7; r++) {
      const level = grid[c][r];
      const count = getCommitCount(level, densityMode);
      if (count > 0) {
        const baseDate = moment(startOfGraph).add(c, "w").add(r, "d");
        // Skip commits in the future
        if (baseDate.isBefore(moment())) {
          for (let i = 0; i < count; i++) {
            // Distribute commits realistically throughout the day
            const realisticDate = moment(baseDate)
              .add(random.int(8, 20), "h")
              .add(random.int(0, 59), "m")
              .add(random.int(0, 59), "s")
              .format();
            commitsList.push(realisticDate);
          }
        }
      }
    }
  }

  if (commitsList.length === 0) {
    console.log("No commits to generate for this pattern/configuration.");
    return;
  }

  console.log(`\nReady to generate ${commitsList.length} commits.`);

  if (dryRun) {
    console.log("[DRY RUN] Bypassing commit generation and git push.");
    return;
  }

  console.log("Generating commits... Please wait... (this might take a minute)");
  let currentCount = 0;
  for (const date of commitsList) {
    currentCount++;
    const data = { date };
    await writeJson(path, data);
    await git.add(path);
    await git.commit(date, { "--date": date });

    if (currentCount % 10 === 0 || currentCount === commitsList.length) {
      console.log(`Progress: ${currentCount}/${commitsList.length} commits generated.`);
    }
  }

  console.log("Pushing commits to remote...");
  try {
    await git.push();
    console.log("SUCCESS! All commits pushed to GitHub successfully.");
  } catch (error) {
    console.error("Error during git push: ", error.message);
  }
};

// Generate a random-dots grid
const makeRandomGrid = (totalCommits) => {
  const grid = Array.from({ length: 53 }, () => Array(7).fill(0));
  let count = 0;
  // Estimate number of active days needed to hit total commits roughly
  const estimatedDays = Math.min(300, Math.ceil(totalCommits / 3));
  while (count < estimatedDays) {
    const x = random.int(0, 52);
    const y = random.int(0, 6);
    if (grid[x][y] === 0) {
      grid[x][y] = random.int(1, 4);
      count++;
    }
  }
  return grid;
};

// Simple helper to ask question via promise
const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => rl.question(query, (ans) => {
    rl.close();
    resolve(ans.trim());
  }));
};

// Command Line Argument Parser
const parseArgs = () => {
  const args = process.argv.slice(2);
  const params = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--text' && args[i + 1]) {
      params.text = args[i + 1];
      i++;
    } else if (args[i] === '--pattern' && args[i + 1]) {
      params.pattern = args[i + 1];
      i++;
    } else if (args[i] === '--random' && args[i + 1]) {
      params.random = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--density' && args[i + 1]) {
      params.density = args[i + 1];
      i++;
    } else if (args[i] === '--dry-run') {
      params.dryRun = true;
    }
  }
  return params;
};

// Main Entry Point
const main = async () => {
  const params = parseArgs();

  let grid;
  let density = params.density || 'medium';
  let dryRun = !!params.dryRun;

  // Decide inputs based on CLI flags or interactive prompts
  if (Object.keys(params).length > 0) {
    // Non-interactive Mode (CLI parameters)
    console.log("Running in non-interactive CLI mode...");
    if (params.text) {
      console.log(`Text input: "${params.text}"`);
      const cols = stringToColumns(params.text);
      grid = positionOnGrid(cols);
    } else if (params.pattern) {
      console.log(`Pattern input: "${params.pattern}"`);
      const cols = patternToColumns(params.pattern);
      grid = positionOnGrid(cols);
    } else if (params.random !== undefined) {
      console.log(`Random commits mode: count = ${params.random}`);
      grid = makeRandomGrid(params.random);
      // Random mode uses direct count, so let's set density accordingly
      density = 'random';
    } else {
      console.error("Error: Please specify one of --text, --pattern, or --random.");
      process.exit(1);
    }

    printPreview(grid);
    await executeCommits(grid, density, dryRun);
  } else {
    // Interactive Mode
    console.log("=========================================");
    console.log("          🌱 goGreen CLI Studio          ");
    console.log("=========================================");
    console.log("1. Custom Text Art (e.g. 'GO GREEN')");
    console.log("2. Predefined Pattern (Heart, Smiley, Checkerboard)");
    console.log("3. Classic Random Commits");
    console.log("4. Quit");
    
    const choice = await askQuestion("Select mode (1-4): ");
    
    if (choice === '4' || !choice) {
      console.log("Goodbye!");
      process.exit(0);
    }

    if (choice === '1') {
      const text = await askQuestion("Enter text to display (max 8 characters): ");
      if (!text) {
        console.error("Invalid text. Exiting.");
        process.exit(1);
      }
      const cols = stringToColumns(text);
      grid = positionOnGrid(cols);
    } else if (choice === '2') {
      console.log("\nPresets: heart | smiley | checkerboard");
      const patternName = await askQuestion("Enter pattern name: ");
      const cols = patternToColumns(patternName);
      if (cols.length === 0) {
        console.error("Unknown pattern. Exiting.");
        process.exit(1);
      }
      grid = positionOnGrid(cols);
    } else if (choice === '3') {
      const countStr = await askQuestion("Enter approximate number of commits (default 100): ");
      const count = parseInt(countStr, 10) || 100;
      grid = makeRandomGrid(count);
      density = 'random';
    } else {
      console.log("Invalid choice. Exiting.");
      process.exit(1);
    }

    if (choice !== '3') {
      console.log("\nSelect Density / Green Shade Level:");
      console.log("1. Low (Light shades)");
      console.log("2. Medium (Standard shades)");
      console.log("3. High (Dark shades)");
      console.log("4. Gradient (Multi-shades matching pattern levels)");
      console.log("5. Random (Varying intensities)");
      const densChoice = await askQuestion("Select density (1-5, default 2): ");
      if (densChoice === '1') density = 'low';
      else if (densChoice === '3') density = 'high';
      else if (densChoice === '4') density = 'gradient';
      else if (densChoice === '5') density = 'random';
      else density = 'medium';
    }

    printPreview(grid);

    const dryRunChoice = await askQuestion("Run in dry-run mode (only preview, no commits)? (y/n, default n): ");
    dryRun = dryRunChoice.toLowerCase() === 'y';

    if (dryRun) {
      await executeCommits(grid, density, true);
    } else {
      const confirm = await askQuestion("Are you sure you want to write these commits to git? (y/n): ");
      if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
        await executeCommits(grid, density, false);
      } else {
        console.log("Aborted. No commits were made.");
      }
    }
  }
};

main().catch(err => {
  console.error("An unexpected error occurred:", err);
  process.exit(1);
});

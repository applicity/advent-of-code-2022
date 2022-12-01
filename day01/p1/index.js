const fs = require("fs");
const text = fs.readFileSync("../input", "utf8");

// Split into chunks then reduce the values.  Finally get the max.
console.log(
  Math.max(
    ...text.split("\n\n").map((v) => {
      return v
        .split("\n")
        .filter(Boolean)
        .reduce((a, c) => a + parseInt(c, 10), 0);
    })
  )
);

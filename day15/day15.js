const manhattanDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const extractor = /^Sensor at x=(-?[0-9]+), y=(-?[0-9]+): closest beacon is at x=(-?[0-9]+), y=(-?[0-9]+)/;

const setupData = (input, rowNumber, part2 = false) => {
  const pairs = input
    .map((l) => {
      const matches = l.match(extractor);
      // console.log(matches);
      return {
        sensor: {
          x: parseInt(matches[1], 10),
          y: parseInt(matches[2], 10),
        },
        beacon: {
          x: parseInt(matches[3], 10),
          y: parseInt(matches[4], 10),
        },
      };
    })
    .map((p) => {
      const dist = manhattanDistance(p.sensor, p.beacon);
      const toLine = manhattanDistance(p.sensor, { x: p.sensor.x, y: rowNumber });
      return { ...p, distance: dist, toLine };
    })
    // Only consider the ones that touch the line distance >= toLine
    .filter((p) => part2 || p.distance >= p.toLine);

  return { pairs };
};

const combineRanges = (ranges) => ranges
  .sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]))
  .reduce((combined, next) => {
    if (!combined.length || combined[combined.length - 1][1] < next[0] - 1) {
      combined.push(next);
    } else {
      const prev = combined.pop();
      combined.push([prev[0], Math.max(prev[1], next[1])]);
    }
    return combined;
  }, []);

const day15 = (input, rowNumber = 10) => {
  const { pairs } = setupData(input, rowNumber);
  const ranges = [];
  pairs.forEach(({ sensor, distance, toLine }) => {
    const offset = distance - toLine;
    ranges.push([sensor.x - offset, sensor.x + offset]);
  });

  // console.log('Ranges', ranges, combineRanges(ranges).reduce((a, c) => ((c[1] - c[0]) + a), 0));
  return combineRanges(ranges).reduce((a, c) => c[1] - c[0] + a, 0);
};

const day15part2 = (input, maxRange = 10) => {
  const { pairs } = setupData(input, 1, true);
  for (let y = 0; y <= maxRange; y += 1) {
    const ranges = [];

    pairs.forEach(({ sensor, distance }) => {
      // Work out the distance from the line.
      const toLine = manhattanDistance(sensor, { x: sensor.x, y });
      const offset = distance - toLine;

      if (offset > 0) {
        let from = sensor.x - offset;
        let to = sensor.x + offset;

        if (from > to) {
          [from, to] = [from, to].reverse();
        }

        // Check it's a valid range.
        if (from > maxRange || to < 0) {
          // console.log('Invalid');
        } else {
          if (to > maxRange) to = maxRange;
          if (from < 0) from = 0;
          ranges.push([from, to]);
        }
      }
    });
    const check = combineRanges(ranges);
    if (check.length !== 1) {
      return (check[0][1] + 1) * 4000000 + y;
    }
  }

  return false;
};

module.exports = {
  day15,
  day15part2,
  combineRanges,
};

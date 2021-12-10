import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";
import convertToDecimal from "bin-to-decimal";

export const prepareData = (data) => {
  const map = data.map((r) => r.split("").map((i) => parseInt(i, 10)));
  return {
    map,
  };
};
export const prepareData2 = (data) => {
  const map = data.map((r) =>
    r.split("").map((i) => {
      let val = parseInt(i, 10);
      return val === 9 ? -1 : val;
    }),
  );
  return {
    map,
  };
};

export const validate = (map) => {
  let answer = 0;
  let i = 0;
  while (i < map.length) {
    let k = 0;
    while (k < map[i].length) {
      if (isPointLowest({ map, x: k, y: i })) {
        console.log(map[i][k]);
        answer += map[i][k] + 1;
      }
      k++;
    }
    i++;
  }
  return { answer };
};

export const isPointLowest = ({ map, x, y }) => {
  const point = map[y][x];
  let isYetLowest = true;
  map[y];

  let row = map[y];
  if (x !== 0) {
    isYetLowest = isYetLowest && point < row[x - 1];
  }
  if (x < row.length - 1) {
    isYetLowest = isYetLowest && point < row[x + 1];
  }

  if (y !== 0) {
    row = map[y - 1];
    isYetLowest = isYetLowest && point < row[x];
    // if (x !== 0) {
    //   isYetLowest = isYetLowest && point < row[x - 1];
    // }
    // if (x < row.length - 1) {
    //   isYetLowest = isYetLowest && point < row[x + 1];
    // }
  }

  if (y < map.length - 1) {
    row = map[y + 1];
    isYetLowest = isYetLowest && point < row[x];
    // if (x !== 0) {
    //   isYetLowest = isYetLowest && point < row[x - 1];
    // }
    // if (x < row.length - 1) {
    //   isYetLowest = isYetLowest && point < row[x + 1];
    // }
  }

  return isYetLowest;
};

export const getPools = (map) => {
  const pools = map.map((row, rowIndex) => {
    const poolParts = row.split("9");
    const poolPartObjects = [];
    let i = 0;
    let x = 0;
    while (i < poolParts.length) {
      const part = poolParts[i];
      if (part.length === 0) {
        x++;
      } else {
        const to = x + part.length - 1;
        poolPartObjects.push({
          // refs: [],
          // id: `${rowIndex},${x}`,
          from: x,
          length: part.length,
          to,
          sum: part
            .split("")
            .map((i) => parseInt(i, 10))
            .reduce((s, p) => s + parseInt(p, 10), 0),
        });
        x = to + 2;
      }
      i++;
    }
    return poolPartObjects;
  });
  // console.log(pools);
  return pools;
};

export const xorSumArrays = (arr1, arr2) => {
  // OBS! all "9" is actually -1
  /*
  ..9.9....99..
  9......9.....
  ...999.999...
  99999..999...
  ...9999999...
  9999999999999
  .999999999999
  */
  /* XOR of lines:
  ..9.9....99..
  9......9.....
->............. -> 1 new pool

  9......9.....
  ...999.999...
->.......9..... -> 2 old pools

  ...999.999...
  99999..999...
->...99..999... -> 3 pools

  99999..999...
  ...9999999...
->...99..999... -> 3 pools

  ...9999999...
  9999999999999
->...9999999... -> 2 old pools, 

  9999999999999
  .999999999999
->.999999999999 -> 1 new pools, 
*/
  return arr1.map((a, i) => {
    if (arr2[i] === -1 && a === -1) {
      return 0;
    }
    if (arr2[i] === -1 && a !== -1) {
      return a;
    }
    if (arr2[i] !== -1 && a === -1) {
      return arr2[i];
    }
    return a + arr2[i];
  });
};

export const mergePools = (pools) => {
  let previousPools = pools[0];
  let i = 1;
  while (i < pools.length) {
    const currentPools = pools[i];
    let j = 0;
    while (j < previousPools.length) {
      const previousPool = previousPools[j];

      let k = 0;
      while (k < currentPools.length) {
        const currentPool = currentPools[k];
        if (
          previousPool.from <= currentPool.from &&
          previousPool.to >= currentPool.from
        ) {
          // add this currents ref to previousPool refs
          previousPool.refs.push(currentPool.id);
        }
        k++;
      }
      j++;
    }
    i++;
  }
  return [];
};

export const getPool = ({ map, lowestPoint }) => {
  const pool = [map[lowestPoint.y][lowestPoint.x]];
  let rowDone = false;
  while (!rowDone) {
    let row = map[lowestPoint.y];
    console.log({ row });
    let x = lowestPoint.x;

    // decrease:
    let i = 1;
    let exit = false;
    while (!exit && x - i > -1) {
      if (row[x - i] === 9) {
        exit = true;
      } else {
        pool.push(row[x - i]);
      }
      i++;
    }

    // increase:
    i = 1;
    exit = false;
    while (!exit && x + i < row.length) {
      if (row[x + i] === 9) {
        exit = true;
      } else {
        pool.push(row[x + i]);
      }
      i++;
    }
    rowDone = true;
  }
  console.log({ pool });
  return pool;
};

export const validate2 = (grid) => {
  const groups = [];
  const count_groups = (i, j) => {
    if (
      j < 0 ||
      j >= grid.length ||
      i < 0 ||
      i >= grid[0].length ||
      grid[j][i] == 9 ||
      grid[j][i] == -1
    ) {
      return;
    }
    grid[j][i] = -1;
    groups[groups.length - 1] += 1;

    count_groups(i + 1, j);
    count_groups(i - 1, j);
    count_groups(i, j + 1);
    count_groups(i, j - 1);
  };
  let k = 0;
  while (k < grid.length) {
    let l = 0;
    while (l < grid[0].length) {
      groups.push(0);
      count_groups(l, k);
      l++;
    }
    k++;
  }
  groups.sort((a, b) => a - b);
  return { answer: groups.pop() * groups.pop() * groups.pop() };
};

const Description = styled(Text)``;

const Day = () => {
  const [resultOne, setResultOne] = useState(null);
  const [resultTwo, setResultTwo] = useState(null);

  const onRun = () => {
    // const preparedData = prepareData(inputData);
    // setResultOne(validate(preparedData))
    // let sums = validateTwo(preparedData)
    // setResultTwo(sums[0])
  };

  const taskDescription = `What do you get if you multiply your final horizontal position by your final depth?`;

  return (
    <div>
      <p>
        <Description>{taskDescription}</Description>
      </p>
      <RunButton onClick={onRun} />
      <Results resultOne={resultOne} resultTwo={resultTwo} />
    </div>
  );
};
export default Day;

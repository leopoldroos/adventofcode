import React, { useState } from "react";
import RunButton from "@/components/molecules/RunButton";
import Results from "@/components/molecules/Results";
import Text from "@/components/atoms/Text";
import styled from "styled-components";

export const prepareData = (data) => {
  const regex = new RegExp("^[A-Z]*$", "");

  const allCaves = data.map((row) => row.split("-"));
  const caves = {};
  const addCave = ({ id, connectedId }) => {
    if (!caves[id]) {
      caves[id] = {
        id,
        isBig: regex.test(id),
        connectedIds: [],
      };
    }
    caves[id].connectedIds.push(connectedId);
  };
  allCaves.forEach(([fromId, toId]) => {
    addCave({ id: fromId, connectedId: toId });
    addCave({ id: toId, connectedId: fromId });
  });
  // console.log(caves);
  return caves;
};

export const logic = (caves) => {
  return;
};

export const validate = (caves) => {
  let paths = {};

  const checkPath = ({ id, pathToThisId, connectedIdsToThisId }) => {
    const pathId = pathToThisId.length ? `${pathToThisId}-${id}` : id;
    connectedIdsToThisId.push(id);

    const connectedIds = caves[id].connectedIds.filter(
      (connectedId) =>
        !connectedIdsToThisId.includes(connectedId) || caves[connectedId].isBig,
    );

    // console.log({ id, pathId, connectedIdsToThisId, connectedIds });

    if (id === "end") {
      paths[pathId] = connectedIdsToThisId;
    } else if (connectedIds.length > 0) {
      connectedIds.forEach((connectedId) => {
        checkPath({
          id: connectedId,
          pathToThisId: pathId,
          connectedIdsToThisId: [...connectedIdsToThisId],
        });
      });
    }
  };
  checkPath({ id: "start", pathToThisId: "", connectedIdsToThisId: [] });
  // console.log({ paths });
  return { answer: Object.keys(paths).length };
};

export const validate2 = (caves) => {
  let paths = {};
  // console.log(caves);

  const checkPath = ({
    id,
    pathToThisId,
    connectedIdsToThisId,
    // doubleVisitDone,
  }) => {
    const pathId = pathToThisId.length ? `${pathToThisId}-${id}` : id;

    if (id === "end") {
      connectedIdsToThisId.push(id);
      paths[pathId] = connectedIdsToThisId;
    } else {
      let hasDouble = false;
      const smallCaves = {};
      connectedIdsToThisId.forEach((c) => {
        if (!caves[c].isBig) {
          if (!smallCaves[c]) {
            smallCaves[c] = [];
          }
          smallCaves[c].push(c);
          if (smallCaves[c].length > 1) {
            hasDouble = true;
          }
        }
      });

      if (
        hasDouble &&
        !caves[id].isBig &&
        connectedIdsToThisId.find((c) => c === id)
        // caves[id] !== "start" &&
        // caves[id] !== "end"
      ) {
        // console.log({ smallCaves, id });
        return;
      }

      connectedIdsToThisId.push(id);

      const connectedIds = caves[id].connectedIds.filter((connectedId) => {
        if (connectedId === "start") {
          return false;
        }
        // if (caves[connectedId].isBig) {
        //   return true;
        // }
        // if (hasDouble && connectedIdsToThisId.find((c) => c === connectedId)) {
        //   return false;
        // }
        return true;
      });

      // if (hasDouble) {
      //   console.log({
      //     id,
      //     pathId,
      //     connectedIdsToThisId,
      //     connectedIds,
      //     hasDouble,
      //   });
      // }

      if (connectedIds.length > 0) {
        // let siblingDoubleVisitDone = hasDouble;
        connectedIds.forEach((connectedId) => {
          // siblingDoubleVisitDone =
          //   siblingDoubleVisitDone ||
          checkPath({
            id: connectedId,
            pathToThisId: pathId,
            connectedIdsToThisId: [...connectedIdsToThisId],
            // doubleVisitDone: hasDouble || siblingDoubleVisitDone,
          });
        });
      }
      // return siblingDoubleVisitDone;
    }
  };
  checkPath({
    id: "start",
    pathToThisId: "",
    connectedIdsToThisId: [],
    // doubleVisitDone: false,
  });
  // console.log({ paths });
  return { answer: Object.keys(paths).length };
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

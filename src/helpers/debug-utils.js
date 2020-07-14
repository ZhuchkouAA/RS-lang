/* eslint-disable no-console */

export const printQueue = (queue, isFull) => {
  if (queue && queue.length > 0) {
    console.log(`queue.length = ${queue.length}`);

    const words = [];

    queue.map(
      ({
        difficulty,
        optional: { word, isHard, isStudying, isDeleted, isMethodPost, isHighPriority },
      }) => {
        if (isFull) {
          const flags = `prior=${isHighPriority} study=${isStudying} hard=${isHard} del=${isDeleted} method=${isMethodPost}`;

          return words.push(`${word}(${difficulty})(${flags})`);
        }
        return words.push(`${word}(${difficulty}) `);
      }
    );

    console.log(`words = ${words.join(', ')}`);
  }
};

export const newFunc = () => {};

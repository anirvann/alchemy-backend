const SEC_MULTIPLIER = 1000;
const serverReqTimer = (response, startTime, done, printText) => async () => {
  const diff = process.hrtime(startTime);
  console.log(
    `Request  ${printText} :: time taken = ${diff[0] * SEC_MULTIPLIER +
      diff[1]} seconds`
  );
  response.end(printText);
  done();
};
export default serverReqTimer;

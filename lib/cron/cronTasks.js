var CronJob = require('cron').CronJob;

var job = new CronJob('00 30 11 * * 1-5', function() {
  /*
   * Runs every 5 minute every day
   */
   console.log("in function")
  }, function () {
   console.log("in function 2")

  },
  true, /* Start the job right now */
  'America/Los_Angeles' /* Time zone of this job. */
);

job.start();
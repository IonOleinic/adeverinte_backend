const cron = require('node-cron')
const reportService = require('../services/reportService')
const userService = require('../services/userService')
const ROLES_LIST = require('../../config/rolesList')

cron.schedule('0 16 * * *', async () => {
  console.log('Running daily report generation at 16:00')
  const users = await userService.getAllUsers()
  const userEmails = users
    .filter((user) => !user.roles?.includes(ROLES_LIST.Admin))
    .map((user) => user.email)
  await reportService.sendDailyCertRepEmail(userEmails)
})

// async function generateAndSendReport() {
//   console.log('Running daily report generation at 16:00')
//   const users = await userService.getAllUsers()

//   const userEmails = users
//     .filter((user) => !user.roles?.includes(ROLES_LIST.Admin))
//     .map((user) => user.email)
//   await reportService.sendDailyCertRepEmail(userEmails)
// }

// generateAndSendReport()

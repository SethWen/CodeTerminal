/**
 * author: Shawn
 * time  : 2017/11/21 17:52
 * desc  :
 */

const {spawn} = require('child_process');
const bat = spawn('cmd.exe', ['/c', 'echo("111")']);
// const script = spawn('echo(111)');

bat.stdout.on('data', (data) => {
    console.log(`${data}`);
});
//
// script.stderr.on('data', (data) => {
//     console.log(`stderr: ${data}`);
// });
//
// script.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
// });


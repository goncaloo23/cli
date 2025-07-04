const spawn = require("child_process").spawnSync;
const fs = require("fs");

const commands = `cmf init
cmf new
cmf new business
cmf new database
cmf new data
cmf new feature
cmf new help
cmf new html
cmf new iot
cmf new test
cmf restore
cmf build
cmf build help
cmf build help generateBasedOnTemplates
cmf build help generateMenuItems
cmf pack
cmf assemble
cmf bump
cmf bump iot
cmf bump iot configuration
cmf bump iot customization
cmf ls`;

const myArgs = process.argv.slice(2);
if (myArgs.length < 1) {
    console.error("Usage: node gen-cmds.js <path to cmf-cli dll>");
    process.exit(1);
}

commands.split("\n").forEach(c => {
    c = c.split(" ").splice(1).join(" ").trimEnd(); // remove "cmf "
    const outFile = `./src/03-explore/commands/${c.replace(/\s/g, "_")}.md`;
    if (!fs.existsSync(outFile)) {
        fs.writeFileSync(outFile, 
            `# ${c}

<!-- BEGIN USAGE -->
<!-- END USAGE -->`,
            {encoding: "utf8"});
    }
    const res = spawn(`dotnet ${myArgs[0]} ${c} -h | ./help2md/help2md-in-place ${outFile}`, { shell: true, encoding: "utf8" })
    console.debug(res.error || res.output);
});

/* 
now we need to clean a couple of things:
- new help and new iot should not have subcommands
- some subcommand tables end midline: these need to be fixed
*/

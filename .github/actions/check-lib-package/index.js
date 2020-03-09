const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('child_process').exec;

try {
    const libName = core.getInput('lib-name');
    core.info(`lib-name = ${libName}`);

    const filesInCommitCmd = `git diff-tree --no-commit-id --name-only -r ${github.context.sha}`;
    exec(filesInCommitCmd, function(err, stdout) {
        if (err != null) {
            core.setFailed(err);
        } else {
            const filePaths = stdout.toString().split('\n');
            const fileNames = filePaths.map(path => {
                const filePathArray = path.toString().split('/');
                return `${filePathArray[filePathArray.length - 2]}/${filePathArray[filePathArray.length - 1]}`;
            });
            console.log('file-names:', fileNames);
            core.setOutput('isLibPackageChanged', fileNames.includes(`${libName}/package.json`).toString());
        }
    });
} catch (error) {
    core.setFailed(error.message);
}

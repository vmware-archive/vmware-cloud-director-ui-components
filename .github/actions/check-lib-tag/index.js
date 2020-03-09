const core = require('@actions/core');
const github = require('@actions/github');

try {
    const libName = core.getInput('lib-name');
    const refStringArray = github.context.ref.split('/');
    const tagName = refStringArray[refStringArray.length - 1];
    core.info(`tag-name = ${tagName}`);
    const regex = new RegExp(`/^${libName}-v[0-999].[0-999].[0-999]$/`);
    core.setOutput('isLibTag', regex.test(tagName).toString());
} catch (error) {
    core.setFailed(error.message);
}

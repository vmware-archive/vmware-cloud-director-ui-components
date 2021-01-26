const core = require('@actions/core');
const github = require('@actions/github');

try {
    // Sample value of github.context.ref is "refs/heads/gh-actions"
    const tagName = github.context.ref.split('/').pop();
    console.log(`tag-name = ${tagName}`);
    const regex = new RegExp(`^v[0-999].[0-999].[0-999]$`);
    core.setOutput('isReleaseTag', regex.test(tagName).toString());
} catch (error) {
    core.setFailed(error.message);
}

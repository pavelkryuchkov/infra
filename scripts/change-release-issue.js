const {Octokit} = require("@octokit/core");


const BRANCH = process.env.BRANCH;
let version = BRANCH.split('/');
version = version[version.length - 1];

const token = process.env.TOKEN;
const actor = process.env.ACTOR;
const body = process.env.BODY;
const octokit = new Octokit({
  // auth: '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',
  auth: token,
})

async function update(id) {
  return octokit.request(`PATCH /repos/linalone17/infra/issues/${id}`, {
    owner: actor,
    repo: 'infra',
    issue_number: id,
    title: version,
    body: 'I\'m having a problem with this.',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
}

async function create() {
  return octokit.request('POST /repos/linalone17/infra/issues', {
    owner: actor,
    repo: 'infra',
    title: version,
    body: body,
    labels: [
      'RELEASE'
    ],
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
}

octokit.request('GET /repos/linalone17/infra/issues?labels=RELEASE', {
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})
  .then(res => res.data.find(el => el.title === version))
  .then(issue => {
    if (issue) {
      return update(issue.id)
    } else {
      return create();
    }
  })
  .then(() => console.log('Changed release notes'))
  .catch(() => process.exit(1));

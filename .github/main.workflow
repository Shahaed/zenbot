workflow "Pull Request Unit Test & Integ Test Run" {
  on = "pull_request"
  resolves = ["GitHub Action for npm-2"]
}

action "Setup Node.js for use with actions" {
  uses = "actions/setup-node@3d792c1dbd495fc03ea5f33f13f53cf2f774d317"
  runs = "mkdir -p secrets && cd secrets && echo \"${ENV_FILE}\" > .env && echo \"${ZENBOT_DB_FILE}\" > zenbot.json"
  secrets = ["ENV_FILE", "ZENBOT_DB_FILE"]
}

action "GitHub Action for npm" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Setup Node.js for use with actions"]
  runs = "npm install"
}

action "GitHub Action for npm-1" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["GitHub Action for npm"]
  runs = "npm test"
}

action "GitHub Action for npm-2" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["GitHub Action for npm-1"]
  runs = "npm run-integ-test"
}

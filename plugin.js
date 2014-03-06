
module.exports = function (poppins) {
  var plugins = poppins.plugins;

  plugins.labels = plugins.labels || {};

  var updateLabels = function (issue) {
    issue.labels = issue.labels || [];

    var applicableLabels = Object.keys(plugins.labels).
        filter(function (labelName) {
          try {
            return plugins.labels[labelName](issue);
          } catch (e) {
            this.log(e.stack);
            return false;
          }
        }.bind(this));

    issue.labels = issue.labels.concat(applicableLabels);

    this.rest.issues.edit({
      user    : this.config.msg.user,
      repo    : this.config.msg.repo,
      number  : issue.number,
      labels  : issue.labels
    });
  }.bind(poppins);

  poppins.on('pullRequestCreated', updateLabels);
  poppins.on('issueCreated', updateLabels);
};

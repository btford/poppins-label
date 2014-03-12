module.exports = function (poppins) {
  var plugins = poppins.plugins;

  plugins.labels = plugins.labels || {};

  var updateLabels = function (data) {

    var labels = (data.issue || data.pull_request).labels || []

    var applicableLabels = Object.keys(plugins.labels).
        filter(function (labelName) {
          try {
            return plugins.labels[labelName](data);
          } catch (e) {
            poppins.log(e.stack);
            return false;
          }
        });

    labels = labels.concat(applicableLabels);
    poppins.rest.issues.edit({
      user    : poppins.config.msg.user,
      repo    : poppins.config.msg.repo,
      number  : (data.issue || data.pull_request).number,
      labels  : labels
    }).catch(poppins.log.bind(poppins));
  };

  poppins.on('pullRequestOpened', updateLabels);
  poppins.on('issueOpened', updateLabels);
};

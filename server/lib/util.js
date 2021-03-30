const qs = require("qs");

const getRole = (userRoles) => {
  const instructorRegex = /.*instructor.*/i;
  const learnerRegex = /.*learner.*/i;

  let isInstructor = false;
  let isLearner = false;

  if (!userRoles) {
    return "none";
  }

  userRoles.forEach((role) => {
    if (instructorRegex.test(role)) {
      isInstructor = true;
    } else if (learnerRegex.test(role)) {
      isLearner = true;
    }
  });

  if (isInstructor) return "instructor";
  if (isLearner) return "learner";
  return "unknown";
};

module.exports = {
  createContext: (user) => ({
    contextId: user.context_id || null,
    userId: user.user_id || null,
    userRole: getRole(user.roles),
    userEmail: user.lis_person_contact_email_primary,
    userName: user.lis_person_name_full,
  }),
  parseQueryParameters: (headers) => {
    // match / or ? or both at the start of the location string, and remove.
    const queryString = headers.location.replace(/^\/?\??/, "");
    return qs.parse(queryString, {
      ignoreQueryPrefix: true,
    });
  },
};

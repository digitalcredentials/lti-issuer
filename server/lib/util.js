const qs = require("qs");

const getRole = userRoles => {
  const instructorRegex = /.*instructor.*/i;
  const learnerRegex = /.*learner.*/i;

  let isInstructor = false;
  let isLearner = false;

  if (!userRoles) {
    return "none";
  }

  userRoles.forEach(role => {
    if (instructorRegex.test(role)) {
      isInstructor = true;
    } else if (learnerRegex.test(role)) {
      isLearner = true;
    }
  });

  if (isInstructor && isLearner) return "both";
  if (isLearner) return "learner";
  if (isInstructor) return "instructor";
  return "unknown";
};

module.exports = {
  createContext: user => ({
    courseId: user.custom_canvas_course_id || null,
    userId: user.custom_lis_user_username || null,
    userRole: getRole(user.roles)
  }),
  parseQueryParameters: headers => {
    // match / or ? or both at the start of the location string, and remove.
    const queryString = headers.location.replace(/^\/?\??/, "");
    return qs.parse(queryString, {
      ignoreQueryPrefix: true
    });
  }
};

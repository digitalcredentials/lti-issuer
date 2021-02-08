module.exports = Data => req => {
  return Data.getAccounts
    .then(response => {
      if (!response.body) {
        return { status: "error" };
      }
      return { status: "success" };
    })
    .catch(err => {
      return { status: "error", message: err.message };
    });
};

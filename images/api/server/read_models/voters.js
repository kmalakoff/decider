module.exports = function({app, services, read_models}) {
  read_models.voters = read_models.voters || [];

  function findOrCreate(id) {
    let index = read_models.voters.findIndex(v => v.id === id);
    if (~index) return read_models.voters[index];
    let voter = {id, title: 'Semantic-Org/Semantic-UI', completed_count: 0};
    read_models.voters.push(voter);
    return voter;
  }

  return (e) => {
    switch(e.type) {
      case 'something_completed': {
        let voter = findOrCreate(e.voter_id);
        voter.completed_count++;
        break;
      }
    }
  }
}

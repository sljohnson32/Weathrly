const formatLocation = (input) => {
  switch (input) {
    case 'denver':
      return 'DENVER';
    case 'san-diego':
      return 'SAN DIEGO';
    case 'san-fransico':
      return 'SAN FRANCISCO';
    case 'castle-rock':
      return 'CASTLE ROCK';
  };
}

module.exports = formatLocation;

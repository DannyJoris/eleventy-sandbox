module.exports = {
  eleventyComputed: {
    // Add people data to film data.
    films: data => data.films.map((el, i) => {
      const peopleProcessed = el.people.map((peopleUrl, j) => {
        if (!peopleUrl.endsWith('/')) {
          const urlSplit = peopleUrl.split('/');
          const id = urlSplit[urlSplit.length -1];
          // peopleRef.url === peopleUrl should work, but peopleRef.url data isn't correct sometimes. ID is more accurate.
          return data.people.find(peopleRef => peopleRef.id === id);
        }
      });
      el.peopleProcessed = typeof peopleProcessed[0] !== 'undefined' ? peopleProcessed : [];
      return el;
    })
  }
};
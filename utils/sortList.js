const sortList = (list) => {
  return list.sort((a, b) => new Date(b.date) - new Date(a.date));
};



export default sortList;
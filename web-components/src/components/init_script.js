if (localStorage.getItem('dialogList') === null) {
localStorage.setItem('dialogList', JSON.stringify([0, 1]));

localStorage.setItem('dialogID_0', JSON.stringify({
  0: {
    text: 'read message',
    time: (new Date('2019-10-10')).getTime(),
    owner: 8080,
    status: 'read',
  },
}));

localStorage.setItem('dialogID_1', JSON.stringify({
  0: {
    text: 'Message',
    time: (new Date()).getTime(),
    owner: 1,
    status: 'new',
  },
}));
}

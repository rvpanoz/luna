const styles = {
  cardAvatar: {
    '&$cardAvatarProfile img': {
      width: '100%',
      height: 'auto'
    }
  },
  cardAvatarProfile: {
    maxWidth: 130,
    maxHeight: 130,
    margin: '-50px auto 0',
    borderRadius: '50%',
    overflow: 'hidden',
    padding: 0,
    '&$cardAvatarPlain': {
      marginTop: 0
    }
  },
  cardAvatarPlain: {}
};

export default styles;

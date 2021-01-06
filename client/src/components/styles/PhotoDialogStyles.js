const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogImg: {
    maxWidth: "70vw",
    minWidth: "23vw",
    height: "auto",
    maxHeight: "60vh",
    margin: "auto"
  },
  paper: {
    maxHeight: '80vh',
  }
});

  export default styles
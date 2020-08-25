import React, { useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden'
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme) => ({
  shareButton: {
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#C0C0C0',
    },
    marginButtom: 5
  },
  shareIcon: {
    [theme.breakpoints.down('xs')]: {
      fontSize: "inherit"
    }
  }
}))

interface ShareButtonProps {
  storeSlug: string
}

const ShareButton: React.FC<ShareButtonProps> = ({ storeSlug }) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  // TODO - add snack bar to messages!
  // const [copySuccess, setCopySuccess] = useState('');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

    function copyToClipboard(e: any) {
      textAreaRef.current.select();
      document.execCommand('copy');
      e.target.focus();
      enqueueSnackbar('Store link copied')
    }
    return (
      <div>

        
      {
       /* Logical shortcut for only displaying the 
          button if the copy command exists */
       document.queryCommandSupported('copy') &&
        <div>
          <IconButton aria-label="share" 
          className={classes.shareButton}
          // className={fontSize === "large"? classes.heartIcon : null}
          onClick={copyToClipboard}
          >
            <ShareIcon fontSize="large" color="primary" className={classes.shareIcon}/>
          </IconButton>
          {/* {copySuccess} */}
        </div>
        
      }
      <form style={{ position: 'absolute', top: -9999, left: -9999}}>
        <textarea
          readOnly
          ref={textAreaRef}
          value={window.location.host + '/#/store/' + storeSlug}
          // value={window.location.hostname + storeSlug}
        />
      </form>
    </div>
    );
}
export default ShareButton
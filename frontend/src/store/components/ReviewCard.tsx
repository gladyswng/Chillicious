import React, { useState, useContext, useRef } from 'react'
import moment from 'moment'
import Modal from '../../shared/components/UIElements/Modal'
import Message from '../../shared/components/UIElements/Message'
import ReviewModal from './ReviewModal'
import { AuthContext } from '../../shared/context/authContext'
import { useHttpClient } from '../../shared/hooks/http-hook' 
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import RatingBar from '../../shared/components/UIElements/RatingBar'
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack'


const useStyles = makeStyles((theme) => ({
  box: { 
    margin: 0, padding: 0, display:'inline-block' 
  },

  review : {
    padding: '12px 0', 
    display: 'flex',
    justifyContent: 'center'
  },
  user: {
    display: 'flex', 
    flexDirection: 'column' ,
    alignItems: 'center'
  },
  comment: {
    paddingLeft: 24,
    width: '80%',
    wordBreak: 'break-all',
    [theme.breakpoints.down('xs')]: {
      width: '90%'
    }

  },
  cardButtons: {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'flex-end',
    height: '70%', 
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
    }
  },
  commentCard: {
    display: 'flex', 
    justifyContent: 'space-between', 
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  }
}));

interface ReviewCardProps {
 review: {
  author: {
    name: string
    avatar?: string
    _id: string
  }
  rating: number
  created: string
  description: string
  title: string

 }
 userReview?: boolean
 storeName?: string
 storeId?: string
 onChange: (store: object) => void
//  onReviewDelete?: (review: object) => void
}

// TODO - ISSUE WITH HAVING TO TOUCH EVERY FIELD TO UPDATE STORE, NOT JUST ONE FIELD 

const ReviewCard: React.FC<ReviewCardProps> = ({ review, storeId, onChange, storeName, userReview }) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const auth = useContext(AuthContext)
  const {isLoading, error, sendRequest, clearError} = useHttpClient() 
  const { rating, author, title, description, created } = review
  const isMountedRef = useRef(null)

  const [modalOpen, setModalOpen] = useState(false)
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  // const editHandler = async (e:any) => {
  //   e.preventDefault()
  //   // TODO - IF STOREPAGE REFRESH STORE, IF PROFILE PAGE DONT REFRESH
  //   // history.push(`/store/edit/${store.id}`)
  // }

  const deleteHandler = async () => {
  
    try {
      
      const responseData = await sendRequest(`/api/store/${storeId}/deleteReview`, 'DELETE', null , { 
        Authorization: 'Bearer ' + auth.token
      })
      console.log(responseData)
      const updatedStore = responseData.updatedStore
      const updatedUser = responseData.updatedUser
      console.log(updatedUser)
      enqueueSnackbar('Review deleted')

      userReview? onChange(updatedUser) : onChange(updatedStore)

    } catch (e) {

    }

  }

    return (
      <div style={{ width: '100%' }}>
        <Divider variant="middle" />
        <div className={classes.review}>
          <div className={classes.user}>
            <Avatar alt='avatar' src={author.avatar} style={{height: 80, width: 80 }}/>
  

            <Typography variant="caption" style={{ fontWeight: "bold" }}>{author.name}</Typography>
            <Typography variant="caption">{moment(created.split('T')[0]).format('MMM/D YY')}</Typography>
             
          </div>
            
        <div className={classes.commentCard}>

          <div className={classes.comment}>
             {storeName && <Typography variant="h6">{storeName}</Typography>}

            <RatingBar rating={rating} readOnly={true}/>
            <Typography variant="h6" style={{ fontWeight: 'normal' }}>{title}</Typography>
            <Typography style={{ width: '100%', wordWrap: 'break-word', wordBreak: 'break-all' }}>{description}</Typography>
            
          </div>
          <div hidden={false} className={classes.cardButtons}>

            {author._id === auth.userId &&
             <ReviewModal 
             userReview={userReview}
             review={review}
             storeId={storeId} 
             onChange={onChange}
             buttonText="Edit"
             buttonStyle="outlined"
             buttonStyles={{width: 84}}
             />
            // <Button variant="outlined" color="primary"
            // size="small"
            // onClick={editHandler}>Edit</Button>
            } 

            {author._id === auth.userId && 
            <Modal buttonStyle='outlined' buttonText='Delete' buttonColor="default" 
            buttonSize="medium"
            open={modalOpen} onOpen={handleModalOpen} onClose={handleModalClose}>
              {error && <Message message={error}/>}
            <Typography>Are you sure?</Typography>
            <Button onClick={deleteHandler}>Yes</Button>
            <Button onClick={handleModalClose}>Cancel</Button>
            </Modal>
            }
          </div>
        </div>

        </div>
      </div>
    );
}
export default ReviewCard
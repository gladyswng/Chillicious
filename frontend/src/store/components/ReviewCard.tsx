import React, { useState, useContext } from 'react'
import moment from 'moment'
import Modal from '../../shared/components/UIElements/Modal'
import ReviewModal from './ReviewModal'
import { AuthContext } from '../../shared/context/authContext'
import { useHttpClient } from '../../shared/hooks/http-hook' 
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import RatingBar from '../../shared/components/UIElements/RatingBar'
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  box: { 
    margin: 0, padding: 0, display:'inline-block' 
  },

  review : {
    padding: 12, 
    display: 'flex'
  },
  user: {
    display: 'flex', 
    flexDirection: 'column' ,
    alignItems: 'center'
  },
  comment: {
    padding: '0 24px',
    width: '68%'
  },
  cardButtons: {
    display: 'flex', 
    flexDirection: 'column', 
    height: '70%', justifyContent: 'space-between'
  },
}));

interface ReviewCardProps {
 review: {
  author: {
    name: string
    _id: string
  }
  avatar?: string
  rating: number
  created: string
  description: string
  title: string

 }

 storeId: string
 onChange: (store: object) => void
}

// TODO - ISSUE WITH HAVING TO TOUCH EVERY FIELD TO UPDATE STORE, NOT JUST ONE FIELD 

const ReviewCard: React.FC<ReviewCardProps> = ({ review, storeId, onChange }) => {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const { rating, avatar, author, title, description, created } = review
  const [modalOpen, setModalOpen] = useState(false)
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const editHandler = async (e:any) => {
    e.preventDefault()
    // TODO - IF STOREPAGE REFRESH STORE, IF PROFILE PAGE DONT REFRESH
    // history.push(`/store/edit/${store.id}`)
  }

  const deleteHander = async (e: any) => {
    e.preventDefault()
    setModalOpen(false)
    // await sendRequest(`http://localhost:3000/store/${store.id}`, 'DELETE', null , { 
    //       Authorization: 'Bearer ' + auth.token
    // })
    // onDelete(store.id)
  }
    return (
      <div style={{ width: '100%' }}>
        <Divider variant="middle" />
        <div className={classes.review}>
          <div className={classes.user}>
            <Avatar alt='avatar' src={avatar? avatar : "https://images.unsplash.com/photo-1562153889-3847e21e5d3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"} style={{height: 80, width: 80 }}/>
  

            <Typography variant="caption" style={{ fontWeight: "bold" }}>{author.name}</Typography>
            <Typography variant="caption">{moment(created.split('T')[0]).format('MMM/D YY')}</Typography>
             
          </div>
            
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

          <div className={classes.comment}>
            <RatingBar rating={rating} readOnly={true}/>
            <Typography variant="h6" style={{ fontWeight: 'normal' }}>{title}</Typography>
            <Typography style={{ width: '100%', wordWrap: 'break-word', wordBreak: 'break-all' }}>{description}</Typography>
            
          </div>
          <div hidden={false} className={classes.cardButtons}>

            {author._id === auth.userId &&
             <ReviewModal 
             review={review}
             storeId={storeId} 
             onChange={onChange}
             buttonText="Edit"
             buttonStyle="outlined"
             />
            // <Button variant="outlined" color="primary"
            // size="small"
            // onClick={editHandler}>Edit</Button>
            } 

            {author._id === auth.userId && 
            <Modal buttonStyle='outlined' buttonText='Delete' buttonColor="default" 
            buttonSize="small"
            open={modalOpen} onOpen={handleModalOpen} onClose={handleModalClose}>
            <Typography>Are you sure?</Typography>
            <Button onClick={deleteHander}>Yes</Button>
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
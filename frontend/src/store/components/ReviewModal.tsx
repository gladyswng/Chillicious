import React, { useState, useContext, useEffect,  } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook' 
import { AuthContext } from '../../shared/context/authContext'
import RatingBar from '../../shared/components/UIElements/RatingBar'
import Modal from '../../shared/components/UIElements/Modal'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '../../shared/components/UIElements/Input'
import Message from '../../shared/components/UIElements/Message'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

interface ReviewModalProps {
  storeId: string
  buttonText: string
  buttonStyle?: "contained" | "outlined"
  // TODO - TYPE 
  onChange: (info: object) => void
  review? : {
    author: {
      name: string
      _id: string
  };

  rating: number
  created: string
  description: string
  title: string
  }
  userReview?: boolean


}

const ReviewModal: React.FC<ReviewModalProps> = ({ storeId, onChange, buttonText, buttonStyle, review, userReview }) => {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const history = useHistory()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const [formState, inputHandler, setFormData] = useForm({
    rating: {
      value: 0,
      isValid: false
    },
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    }
  }, 
  false,
  {})
  // USE EFFEECT FOR UPDATE REVIEW IF ALREADY SET REVIEW
  const { inputs, isValid } = formState

  if (review) {
    useEffect(()=> {
      setFormData({
        rating: {
          value: review.rating,
          isValid: true
        },
        title: {
          value: review.title,
          isValid: true
        },
        description: {
          value: review.description,
          isValid: true
        }
      }, 
      true,
      {})
    }, [review, setFormData])
  }
 
  const [modalOpen, setModalOpen] = useState(false);
  
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);

  };

  const reviewUpdateHandler = async (event: React.FormEvent<HTMLFormElement> ) => {
    // TODO - add review true false to prop so not rerender when update in profile page, no need to reload since there's no store info that needs to be updated
    event.preventDefault()
    try {
      const responseData = await sendRequest(
       `/api/store/${storeId}/updateReview`, 
       'PATCH', JSON.stringify({
         title: inputs.title.value,
         description: inputs.description.value,
         rating: inputs.rating.value,
         }),
       { 
         Authorization: 'Bearer ' + auth.token,
         'Content-Type': 'application/json'
       } 
       )
       
       setModalOpen(false)
       
       
       const store = responseData.updatedStore
       const user = responseData.updatedUser
       userReview? onChange(user) : onChange(store)
    } catch (e) {

    }
  }

  const reviewSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
       `http://localhost:3000/store/${storeId}/addReview`, 
       'POST', JSON.stringify({
         title: inputs.title.value,
         description: inputs.description.value,
         rating: inputs.rating.value,
         }),
       { 
         Authorization: 'Bearer ' + auth.token,
         'Content-Type': 'application/json'
       } 
       )
       
       setModalOpen(false)
      
       const store = responseData
       onChange(store)
       
    } catch (e) {

    }

    
   
    

    // auth.login()
  } 

  return (
    <Modal 
    buttonText={buttonText} 
    buttonStyle={buttonStyle}
    buttonColor="primary" 
    open={modalOpen} 
    onOpen={handleModalOpen} 
    onClose={handleModalClose}>
      {error && <Message message={error}/>}

      <Typography variant="h5">Tell others how hot it is</Typography>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={review? reviewUpdateHandler : reviewSubmitHandler}>
        <div style={{ width: '70%' }}>
          <div>
          <RatingBar 
          readOnly={false} 
          rating={inputs.rating.value} 
          onInput={inputHandler}
          inputIsValid={inputs.rating.isValid}
          />

          <Input 
            id="title" 
            label="Required" 
            inputLabel="Title"
            value={inputs.title.value}
            variant="outlined"
            errorMessage="Invalid title" 
            required
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            blur={true}
            />

          </div>
          
          <div>
          <Input 
            id="description" 
            label="Required" 
            multiline={true}
            rows={4}
            inputLabel="Review"
            value={inputs.description.value}
            variant="outlined"
            errorMessage="Please provide more than 40 characters" 
            required
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(40)]}
            onInput={inputHandler}
            blur={true}
            />

          </div>

        <Button 
        variant="contained"  
        color="primary" 
        type="submit"
        style={{ margin: 8 }}
        disabled={!isValid}
        >Save</Button>
        <Button 
        variant="contained"  
        color="primary" 
        style={{ margin: 8 }}
        onClick={handleModalClose}
        >Cancel</Button>
          
        </div>

      </form>


    </Modal>
  );
}
export default ReviewModal
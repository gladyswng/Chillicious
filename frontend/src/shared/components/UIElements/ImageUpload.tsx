import React, { useRef, useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { fileURLToPath } from 'url'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    height: 150, 
    width: '100%', 
    border: '1px solid #ccc', 
    borderRadius: 4, 
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: '100%', 
    width: '100%', 
    objectFit: 'cover'
  },
  avatarSize: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  }

}));
interface ImageUploadProps {
  id: string
  image: string
  imageStyle: string
  onInput: (id: any, value: any, isValid: any) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ id,  onInput, image, imageStyle }) => {

  const classes = useStyles()
  const [file, setFile] = useState()
  // TODO -TYPE ANY
  const [previewUrl, setPreviewUrl] = useState<string>()

  const [isValid, setIsValid] = useState(false)

  // const filePickerRef = useRef()

  // const pickImageHandler = ({ target } : any) => {
  //   filePickerRef.current.click()



  // }

useEffect(() => {
  if (image) {
    setPreviewUrl(`/api/${image}`)
  }
}, [])


  // Generate a preview whenever theres a new file
  useEffect(()=> {
    if (!file) {
      return 
    }

    const fileReader = new FileReader()
    // execute whenever loads a new file or done parsing a file
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        setPreviewUrl(fileReader.result)
      }
    }
    fileReader.readAsDataURL(file)
  }, [file])

  const pickedHandler = (e:any) => {
    let pickedFile
    let fileIsValid = isValid
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0]

      console.log(pickedFile)
      // console.log(image)
      setFile(pickedFile)
      setIsValid(true)
      fileIsValid = true
    } else {
      setIsValid(false)
      fileIsValid = false
      return
    }

    onInput(id, pickedFile, fileIsValid)
  }


  const imageRenderingStyle = () => {
    if (imageStyle === 'photo') {
      return (
        <>
        <div className={classes.imageContainer}>
          {previewUrl && <img src={previewUrl} alt="Preview" className={classes.image} /> }
          {!previewUrl && <Typography variant="subtitle1" color="primary">Select an image</Typography>}
        </div>
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
        </>
      )
    } else if (imageStyle === 'avatar') {
      return (

        <>
        <Avatar alt='Profile Picture' src={previewUrl} className={classes.avatarSize}/>

        <Button 
        variant="contained" 
        size="small" 
        color="primary" 
        component="span"
        style={{ margin: '20px 0' }}
        >
        Change Picture
        </Button>
        </>
      )
    }
  }
    return (
      <>
    
      <input
        accept=".jpg,.png,.jpeg"
        style={{ display: 'none' }}
        onChange={pickedHandler}
        // ref={filePickerRef}
        id={id}
        multiple
        type="file"
      />
      <label htmlFor={id}>
        {imageRenderingStyle()}
      </label>
    {/* {!isValid && <Typography>{error}</Typography>} */}
    </>
    );
}
export default ImageUpload
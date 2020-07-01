import React, { useRef, useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { fileURLToPath } from 'url'
import { makeStyles } from '@material-ui/core/styles'

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
  }

}));
interface ImageUploadProps {
  id: string
  image: string
  onInput: (id: any, value: any, isValid: any) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ id, image,onInput }) => {
  const classes = useStyles()
  const [file, setFile] = useState()
  // TODO -TYPE ANY
  const [previewUrl, setPreviewUrl] = useState<string>()
  // const [isValid, setIsValid] = useState(false)

  // const filePickerRef = useRef()

  // const pickImageHandler = ({ target } : any) => {
  //   filePickerRef.current.click()



  // }

  // if (image) {
  //   setFile(image)
  // }

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
    // let fileIsValid = isValid
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0]
      // PROBLEM HERE!!! THIS IS NOT SENDING ANYFILES WHEN NOT ANY EVENT!
      console.log(pickedFile)
      setFile(pickedFile)
      // setIsValid(true)
      // fileIsValid = true
    } else {
      // setIsValid(false)
      // fileIsValid = false
      return
    }

    onInput(id, pickedFile, true)


  }
    return (
      <div>
      <Typography>Picture</Typography>
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
        <div className={classes.imageContainer}>
          {previewUrl && <img src={previewUrl} alt="Preview" className={classes.image} /> }
          {!previewUrl && <Typography variant="subtitle1" color="primary">Select an image</Typography>}
        </div>
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    {/* {!isValid && <Typography>{error}</Typography>} */}
    </div>
    );
}
export default ImageUpload
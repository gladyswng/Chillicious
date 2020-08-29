import React, { useState } from 'react'
import Map from '../../shared/components/UIElements/Map'
import Modal from '../../shared/components/UIElements/Modal'

interface MapModalProps {
  searchCoordinates: [number, number]
  wholeScreenModal?: boolean
  loadedStores: {
    id: string
    name: string
    description: string
    image: string
    tags: string[]
    priceRange: string
    address: string
    author: string
    slug: string
    location: {
      coordinates: [number, number]
    }
    ratingsQuantity: number
    ratingsAverage: number
  }[]
}

const MapModal: React.FC<MapModalProps> = ({searchCoordinates, loadedStores, wholeScreenModal}) => {
  const [modalOpen, setModalOpen] = useState(false);
  
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);

  };
    return (
      <Modal   
      buttonText="View Map"
      buttonStyle="contained"
      buttonColor="primary" 
      open={modalOpen} 
      wholeScreenModal
      onOpen={handleModalOpen} 
      onClose={handleModalClose}>
      {searchCoordinates && <Map 
        center={{ lat: searchCoordinates[1], lng: searchCoordinates[0]}} 
        zoom={12}
        pin='multiple'
        style={{ width: '100%', height: '100%' }}
        storeList={loadedStores}
        />}
      </Modal>
    );
}
export default MapModal
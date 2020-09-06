import React, { useState, useEffect, useCallback } from 'react'



export const usePagination = (itemList: any[], itemsPerPage: number) => {
  
  const [currentPage, setCurrentPage] = useState(1)
  const pageCount = Math.ceil(itemList.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const pageChangeHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>, value: number) => {
    setCurrentPage(value)
  }

  useEffect(() => {
    console.log(itemList)
    if (itemList) {   
      setCurrentPage(1)
    }
  }, [itemList])
  
 return { pageChangeHandler,  currentPage, pageCount, indexOfLastItem, indexOfFirstItem }

}




// import React, { useState, useEffect, useCallback } from 'react'



// export const usePagination = (itemList: any[], itemsPerPage: number) => {
  
//   const [currentPage, setCurrentPage] = useState(1)
//   const [currentItemList, setCurrentItemList] = useState<any>(itemList)
//   const [currentItems, setCurrentItems] = useState<any[]>()

//   const pageCount = Math.ceil(itemList.length / itemsPerPage)
//   const indexOfLastItem = currentPage * itemsPerPage
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage

//   // const currentItems = currentItemList.slice(indexOfFirstItem, indexOfLastItem)
//   const pageChangeHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>, value: number) => {
//     setCurrentPage(value)
//   }

//   const setNewData = useCallback((newItemList:any) => {
//     console.log('new', newItemList)
//     setCurrentItemList(newItemList)
//   }, [])

//   useEffect(() => {
//     console.log(currentItemList)
//     setCurrentItems( currentItemList.slice(indexOfFirstItem, indexOfLastItem))
//   }, [currentPage ])

//   useEffect(() => {
//     console.log(itemList)
//     if (itemList) {
//       setCurrentItemList(itemList)
//       setCurrentPage(1)
//       // setCurrentItems(itemList.slice(indexOfFirstItem, indexOfLastItem))

//     }
//   }, [itemList])
//  return { pageChangeHandler, setNewData, currentPage, pageCount, currentItems }

// }
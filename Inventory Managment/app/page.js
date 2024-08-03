'use client'

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField, Select, MenuItem } from '@mui/material'
import { firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#F7F5FC',
  border: '2px solid #F7F5FC',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [itemQuantity, setItemQuantity] = useState(1)
  const [editItemName, setEditItemName] = useState('')
  const [editItemQuantity, setEditItemQuantity] = useState(1)
  const [sortBy, setSortBy] = useState('name')
  const [searchTerm, setSearchTerm] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const addItem = async (item, quantity) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      await setDoc(docRef, { quantity: quantity })
    } else {
      await setDoc(docRef, { quantity: quantity })
    }
    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    await deleteDoc(docRef)
    await updateInventory()
  }

  const editItem = async (item, quantity) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    await setDoc(docRef, { quantity: quantity })
    await updateInventory()
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleEditOpen = (item) => {
    setEditItemName(item.name)
    setEditItemQuantity(item.quantity)
    setEditOpen(true)
  }

  const handleEditClose = () => setEditOpen(false)

  const handleSort = (event) => {
    setSortBy(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedInventory = filteredInventory.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name)
    } else {
      return b.quantity - a.quantity
    }
  })

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
      bgcolor={'#AA8DDB'}
      // sx={{
      //   bgcolor: '#333',
      //   backgroundImage: 'url("/bg.jpg")',
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      // }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" bgcolor={'#F7F5FC'}>
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              type="number"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => {
                addItem(itemName, itemQuantity)
                setItemName('')
                setItemQuantity(1)
                handleClose()
              }}
              sx={{ bgcolor: '#aa8ddb', color: '#fff', '&:hover': { bgcolor: '#bedb8d' } }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Modal
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={editItemName}
              onChange={(e) => setEditItemName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              type="number"
              value={editItemQuantity}
              onChange={(e) => setEditItemQuantity(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => {
                editItem(editItemName, editItemQuantity)
                setEditItemName('')
                setEditItemQuantity(1)
                handleEditClose()
              }}
              sx={{ bgcolor: '#aa8ddb', color: '#fff', '&:hover': { bgcolor: '#bedb8d' } }}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Box display="flex" justifyContent="space-between" alignItems="center" width="800px">
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ bgcolor: '#F7F5FC', color: '#B299DF', '&:hover': { bgcolor: '#bedb8d' } }}
        >
          Add New Item
        </Button>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            style: {
              borderColor: '#bedb8d', 
              color: '#fff', 
            },
          }}
          InputLabelProps={{
            style: {
              color: '#bedb8d',
              borderColor: '#bedb8d',
              '&:focus': {
                color: '#ff0000',
              },
            },
          }}
        />
        <Select value={sortBy} onChange={handleSort} 
                InputProps={{
                  style: {
                    color: '#fff',
                  },
                }}
                MenuProps={{
                  style: {
                    color: '#fff', 
                  },
                }}>
          <MenuItem value="name" style={{ color: '#aa8ddb' }}>Sort by Name</MenuItem>
          <MenuItem value="quantity" style={{ color: '#aa8ddb' }}>Sort by Quantity</MenuItem>
        </Select>
      </Box>

      <Box border={'2px solid #bedb8d'} borderRadius={4}>
        <Box
          width="800px"
          height="100px"
          bgcolor={'#bedb8d'}
          borderRadius={2}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h2'} color={'#fff'} textAlign={'center'}>
            Inventory Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
          {sortedInventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#F7F5FC'}
              paddingX={5}
            >
              <Typography variant={'h3'} color={'#bedb8d'} textAlign={'center'}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant={'h3'} color={'#bedb8d'} textAlign={'center'}>
                {quantity}
              </Typography>
              <Button
                variant="contained"
                onClick={() => addItem(name, quantity + 1)}
                sx={{ bgcolor: '#8ddbd1', color: '#fff', '&:hover': { bgcolor: '#8ddbd1' } }}
              >
                Add
              </Button>
              <Button
                variant="contained"
                onClick={() => removeItem(name)}
                sx={{ bgcolor: '#db8d97', color: '#fff', '&:hover': { bgcolor: '#db8d97' } }}
              >
                Remove
              </Button>
              <Button
                variant="contained"
                onClick={() => handleEditOpen({ name, quantity })}
                sx={{ bgcolor: '#bedb8d', color: '#fff', '&:hover': { bgcolor: '#bedb8d' } }}
              >
                Edit
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}